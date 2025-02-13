"use client"
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import SlotCounter from "react-slot-counter"

const Counter = ({ text_muted, bg_muted }) => {
	const [counterItems, setCounterItems] = useState([])

	useEffect(() => {
		fetch("https://kscplcms.cubeone.in/api/homepage-banner?populate[counterHomePage][populate]=*")
			.then((res) => res.json())
			.then((data) => {
				const counters = data?.data?.counterHomePage
				if(counters) {
					setCounterItems([
						{ id: 1, count: counters.yearsOfExperience, title: "Years of Experience" },
						{ id: 2, count: counters.projectsCompleted, title: "Projects Completed" },
						{ id: 3, count: counters.squareFeetCovered, title: "Square Feet covered" },
						{ id: 4, count: counters.positiveFeedbacks, title: "Positive Feedbacks" }
					])
				}
			})
			.catch((error) => console.error("Error fetching counter data:", error))
	}, [])

	return (
		<div className='pt-20'>
			<div className='container'>
				<ul className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-10 '>
					{ counterItems.map(({ id, count, title }) => (
						<li key={id} className='flex flex-col'>
							<span className={cn(`[font-size:_clamp(48px,9vw,90px)] font-extrabold text-primary-foreground leading-120 overflow-y-hidden overflow-x-auto ${text_muted}`)}>
								<SlotCounter startValue={0} value={count} debounceDelay={5000} duration={2} animateOnVisible={{ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }} />
							</span>
							<span className={cn(`w-[150px] h-[1px] bg-primary 2sm:mt-3.5 2sm:mb-4 mt-1 mb-2 ${bg_muted}`)}></span>
							<span className={cn(`2sm:text-2xl text-xl font-bold text-primary-foreground ${text_muted}`)}>{title}</span>
						</li>
					)) }
				</ul>
			</div>
		</div>
	)
}

export default Counter