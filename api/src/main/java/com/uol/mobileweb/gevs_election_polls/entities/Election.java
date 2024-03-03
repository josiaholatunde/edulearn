package com.uol.mobileweb.gevs_election_polls.entities;

import com.uol.mobileweb.gevs_election_polls.entities.enums.ElectionStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity(name = "elections")
public class Election {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    private Party winner;

    @Column(name = "total_seats_won")
    private Long totalNoOfSeatsWon;

    @Enumerated(EnumType.STRING)
    private ElectionStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    public Election() {
        status = ElectionStatus.PENDING;
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    public Election(ElectionStatus status) {
        this.status = status;
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Party getWinner() {
        return winner;
    }

    public void setWinner(Party winner) {
        this.winner = winner;
    }

    public ElectionStatus getStatus() {
        return status;
    }

    public void setStatus(ElectionStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getTotalNoOfSeatsWon() {
        return totalNoOfSeatsWon;
    }

    public void setTotalNoOfSeatsWon(long totalNoOfSeatsWon) {
        this.totalNoOfSeatsWon = totalNoOfSeatsWon;
    }
}
