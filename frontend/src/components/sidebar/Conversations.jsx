import React from 'react'
import Conversation from './Conversation'
import useGotConversation from '../../hooks/useGotConversation'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = () => {
  const { loading, conversations } = useGotConversation();
  console.log('Conversation: ',conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading?<span className='loading loading-spinner mx-auto'></span>:null}
      {/* conversation = element
      idx = element index */}
      {conversations.map((conversation,idx)=>(
        <Conversation
        key={conversation._id}
        conversation = {conversation}
        emoji = {getRandomEmoji()}
        lastIdx={idx===conversations.length-1}/>
      ))}

    </div>
  )
}

export default Conversations