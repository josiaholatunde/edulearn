package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.UpdateElectionDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.request.enums.ElectionAction;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralPartySeatResultDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralResultDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Election;
import com.uol.mobileweb.gevs_election_polls.entities.Party;
import com.uol.mobileweb.gevs_election_polls.entities.enums.ElectionStatus;
import com.uol.mobileweb.gevs_election_polls.repositories.CandidateRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.ConstituencyRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.ElectionRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.PartyRepository;
import com.uol.mobileweb.gevs_election_polls.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ElectionServiceImpl implements ElectionService {

    private final ElectionRepository electionRepository;
    private final PartyRepository partyRepository;
    private final ConstituencyRepository constituencyRepository;
    private final CandidateRepository candidateRepository;

    @Autowired
    public ElectionServiceImpl(ElectionRepository electionRepository, PartyRepository partyRepository,
                               ConstituencyRepository constituencyRepository, CandidateRepository candidateRepository) {

        this.electionRepository = electionRepository;
        this.partyRepository = partyRepository;
        this.constituencyRepository = constituencyRepository;
        this.candidateRepository = candidateRepository;
    }

    public Election updateElectionStatus(UpdateElectionDTO updateElectionDTO) {
        Election election = getElectionDetails();
        if (ElectionAction.START == updateElectionDTO.getElectionAction()) {
            election.setStatus(ElectionStatus.PENDING);
            election.setCreatedAt(LocalDateTime.now());
            election.setUpdatedAt(LocalDateTime.now());
        } else if (ElectionAction.END == updateElectionDTO.getElectionAction()) {
            Pair<Long, Party> winner = getWinner();
            election.setWinner(winner.getSecond());
            election.setTotalNoOfSeatsWon(winner.getFirst());
            election.setStatus(ElectionStatus.COMPLETED);
            election.setUpdatedAt(LocalDateTime.now());
        }
        return electionRepository.save(election);
    }

    private Pair<Long, Party> getWinner() {
        Map<String, Long> partSeats = getPartySeatsResult();
        PriorityQueue<Pair<String, Long>> topMPParty = new PriorityQueue<>((a, b) -> Long.compare(b.getSecond(), a.getSecond()));

        for (Map.Entry<String, Long> entry: partSeats.entrySet()) {
            topMPParty.offer(Pair.of(entry.getKey(), entry.getValue()));
        }

        if (topMPParty.size() >= 2) {
            Pair<String, Long> highestVoteObject = topMPParty.poll();
            Pair<String, Long> secondHighestVoteObject = topMPParty.poll();
            String highestParty = highestVoteObject.getFirst(); Long highestVote = highestVoteObject.getSecond();
            Long secondHighestVote = secondHighestVoteObject.getSecond();

            if (highestVote != secondHighestVote) return Pair.of(highestVote, getParty(highestParty));

        } else if (topMPParty.size() == 1) {
            Pair<String, Long> highestVoteObject = topMPParty.poll();
            return Pair.of(highestVoteObject.getSecond(), getParty(highestVoteObject.getFirst()));
        }
        return null;
    }

    private Party getParty(String party) {
        return partyRepository.findFirstByParty(party).orElseGet(null);
    }

    @Override
    public Election getElectionDetails() {
        Election election = electionRepository.findFirstByOrderByCreatedAtDesc().orElseGet(() -> electionRepository.save(new Election(ElectionStatus.NOT_STARTED)));
        if (election.getStatus() == ElectionStatus.COMPLETED) {
            Pair<Long, Party> winner = getWinner();
            election.setWinner(winner.getSecond());
            election.setTotalNoOfSeatsWon(winner.getFirst());
            return electionRepository.save(election);
        }
        return election;
    }


    @Override
    public ElectoralResultDTO getResultDetails() {
        Election electionDetails = getElectionDetails();

        Map<String, Long> partSeats = getPartySeatsResult();
        PriorityQueue<Pair<String, Long>> topMPParty = new PriorityQueue<>((a, b) -> Long.compare(b.getSecond(), a.getSecond()));

        List<ElectoralPartySeatResultDTO> electoralPartySeatResultDTOList = new ArrayList<>();

        for (Map.Entry<String, Long> entry: partSeats.entrySet()) {
            topMPParty.offer(Pair.of(entry.getKey(), entry.getValue()));
            electoralPartySeatResultDTOList.add(new ElectoralPartySeatResultDTO(entry.getKey(), entry.getValue().toString()));
        }

        return new ElectoralResultDTO(electionDetails.getStatus().getFriendlyName(), deduceWinner(electionDetails, topMPParty), electoralPartySeatResultDTOList);
    }

    private Map<String, Long> getPartySeatsResult() {
        Map<String, Long> partSeats = new HashMap<>();

        for (Party party: partyRepository.findAll()) partSeats.put(party.getParty(), 0l);

        for (Object[] winnerCandidateDTO: candidateRepository.getWinnerPartyForAllConstituencies()) {
            String party = String.valueOf(winnerCandidateDTO[1]);
            partSeats.put(party, partSeats.get(party) + 1);
        }
        return partSeats;
    }




    private String deduceWinner(Election election, PriorityQueue<Pair<String, Long>> topMPParty) {
        if (election.getStatus() == ElectionStatus.COMPLETED) {
            if (topMPParty.size() >= 2) {
                Pair<String, Long> highestVoteObject = topMPParty.poll();
                Pair<String, Long> secondHighestVoteObject = topMPParty.poll();
                String highestParty = highestVoteObject.getFirst(); Long highestVote = highestVoteObject.getSecond();
                Long secondHighestVote = secondHighestVoteObject.getSecond();

                if (highestVote == secondHighestVote) return "Hung Parliament";
                else return highestParty;
            } else if (topMPParty.size() == 1) return topMPParty.poll().getFirst();
            return election.getWinner() == null ? "Pending": election.getWinner().getParty();
        }
        return "Pending";


    }
}
