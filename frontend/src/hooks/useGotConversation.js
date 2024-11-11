import React, { useEffect, useState } from 'react'

const useGotConversation = () => {
    const [loading,setLoading] = useState(false)
    const [conversations,setConversations] = useState([])

    // 只会跑一次 当这个组件为空的时候 就会fetch数据一次
    // 空依赖数组表示仅在组件首次挂载时执行一次
    useEffect(()=>{
        const getConversations = async ()=>{
            setLoading(true)
            try {
                const res = await fetch('/api/users')
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        //调用函数
        getConversations()
    },[])
    return {loading,conversations}
}

export default useGotConversation