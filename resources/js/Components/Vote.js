import { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

export default function Vote({ article, userId, classNameVote = "", classNameVoteButton = "" }) {
    const [numberOfVotes, setNumberOfVotes] = useState({default: 0, current: 0})
    const [iconColor, setIconColor] = useState(["gray", "gray"])

    useEffect(() => {
        axios.get(`/vote/${article.id}`)
            .then(res => {
                const [upIds, downIds] = res.data

                const votes = {
                    current: upIds.length - downIds.length,
                    default: upIds.length - downIds.length
                }

                if (upIds.includes(userId)) {
                    setIconColor(["black", "gray"])
                    setNumberOfVotes({
                        ...votes,
                        default: votes.default - 1
                    }) 
                } else if (downIds.includes(userId)) {
                    setIconColor(["gray", "black"])
                    setNumberOfVotes({
                        ...votes,
                        default: votes.default + 1
                    })
                } else {
                    setNumberOfVotes(votes)
                }         
            })
            .catch(err => console.log(err))
    }, [])

    const handleUpVote = () => {
        if (article.user_id != userId) {
            if (iconColor[0] == "gray") {
                setIconColor(["black", "gray"])
                setNumberOfVotes({
                    ...numberOfVotes,
                    current: numberOfVotes.default + 1,
                })
            }
            else {
                setIconColor(["gray", "gray"])
                setNumberOfVotes({
                    ...numberOfVotes,
                    current: numberOfVotes.current - 1
                })
            }
            axios.post(`/vote/up/${article.id}`, { article_id: article.id })
                .then((res) => {
                    if (res.data == "ok") console.log("UpVote thành công")
                    else Inertia.get(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    const handleDownVote = () => {
        if (article.user_id != userId) {
            if (article.user_id != userId) {
                if (iconColor[1] == "gray") {
                    setIconColor(["gray", "black"])
                    setNumberOfVotes({
                        ...numberOfVotes,
                        current: numberOfVotes.default - 1,
                    })
                }
                else {
                    setIconColor(["gray", "gray"])
                    setNumberOfVotes({
                        ...numberOfVotes,
                        current: numberOfVotes.current + 1
                    })
                }
                axios.post(`/vote/down/${article.id}`, { article_id: article.id })
                    .then((res) => {
                        if (res.data == "ok") console.log("DownVote thành công")
                        else Inertia.get(res.data)
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    return (
        <div>
            <div className={`text-3xl text-center ${classNameVote}`}>
                <div className={`text-4xl cursor-pointer ${classNameVoteButton}`} onClick={handleUpVote}>
                    <FaSortUp color={iconColor[0]}/> 
                </div>
                <div style={{color: iconColor.includes("black") ? "black" : "gray"}}>
                { numberOfVotes.current > 0 ? "+" + numberOfVotes.current : numberOfVotes.current } 
                </div>
                <div className={`text-4xl cursor-pointer ${classNameVoteButton}`} onClick={handleDownVote}>
                    <FaSortDown color={iconColor[1]} className="hover:text-black"/>
                </div>
            </div>
        </div>
    )
}