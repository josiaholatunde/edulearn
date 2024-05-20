import React, { useEffect, useState } from 'react'
import ChallengeDataTable from './ChallengeDataTable'
import Modal from 'react-bootstrap/Modal';
import OnlineUsersDataTable from '../OnlineUsersDataTable';
import { QUESTION_TYPE } from '../../utils/constants';
import { connect, useDispatch } from 'react-redux';
import { createChallenge, getChallenges } from '../../redux/actions/challengeActions';
import moment from 'moment'
import ChallengeInviteDataTable from './ChallengeInviteDataTable';
import { getChallengeInvites } from '../../redux/actions/challengeInviteActions';


const CHALLENGE_MODE = {
    INDIVIDUAL: 'INDIVIDUAL',
    GROUP: 'GROUP'
}


const CHALLENGE_TYPE = {
    MULTIPLE_CHOICE: {
        name: 'MULTIPLE_CHOICE',
        friendlyType: 'Multiple Choice'
    },
    ALGORITHMS: {
        name: 'ALGORITHMS',
        friendlyType: 'Algorithms'
    }
}



const mapToChallengeInvites = (challengeInvites, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return challengeInvites?.map((challenge, index) => ({
        key: pageStart + (index + 1),
        position: pageStart + (index + 1),
        title: challenge?.title,
        friendlyType: challenge?.friendlyType,
        type: challenge?.type,
        createdBy: challenge?.createdBy || 'N/A',
        status: challenge?.status || 'N/A',
        startDate: moment(challenge?.startDate).format('MMMM Do YYYY, h:mm:ss a') || 'N/A',
        endDate: moment(challenge.endDate).format('MMMM Do YYYY, h:mm:ss a'),
        submissions: challenge?.submissions,
        id: challenge?.id,
        createdAt: moment(challenge?.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        challengeId: challenge?.challengeId,
        challengeType: challenge?.challengeType,
        fullName: challenge?.studentUser?.fullName
    }))
}


const ChallengeInvite = ({ history, loading, total, challengeInvites }) => {
    const [showQuestionStyle, setShowQuestionStyle] = useState(false)
    const [showOnlineUsers, setShowOnlineUsers] = useState(false)
    const [ challengeMode, setChallengeMode ] = useState(CHALLENGE_MODE.INDIVIDUAL)
    const [ selectedOnlineUsersId, setSelectedOnlineUsers ] = useState([])
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(5)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChallengeInvites({ page, size }))
    }, [page])


    const routeToPath = (path) => {
        if (!path) return;
        history.push(path)
    }


    const handleCreateChallenge = (type, friendlyType) => {
        const challengeRequest = {
            type,
            friendlyType,
            participantType: challengeMode,
            totalParticipants: selectedOnlineUsersId.length,
            challengeUsers: selectedOnlineUsersId || [], 
            category: 'random'
        }

        dispatch(createChallenge(challengeRequest, (challengeId) => {
            routeToPath(`/challenge/${challengeId}/details?type=${type}&mode=${challengeMode}`)
        }));
    }
    

    return (
        <div className='mt-6 challenge'>
            <div className='challenge-header d-flex justify-content-between'>
                <h1 className='f-32'>Challenge Invites</h1>
            </div>
            <ChallengeInviteDataTable
                challenges={challengeInvites} 
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
                history={history}
                />  
        </div>
    )
}

const mapStateToProps = ({ challengeInvites: { challengeInvites, total, currentPage, pageSize }, loading }) => {
    return ({
        challengeInvites: mapToChallengeInvites(challengeInvites, currentPage, pageSize),
        total,
        loading
    })
}

export default connect(mapStateToProps, {  getChallengeInvites })(ChallengeInvite)

