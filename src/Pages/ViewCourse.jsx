import React from 'react'
import Player from '../components/VideoPlayer'
import Container from '../components/Container'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

const ViewCourse = () => {
    return (
        <>
            <Container>

                <Player src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' poster="/Images/3785210.jpg"></Player>
                <div className="p-5 py-3 space-y-2 flex  flex-col">
                    <span className="bg-white py-1 px-2 rounded-lg text-sm shadow-lg w-fit ">Web Develpement</span>
                    <p className=" text-4xl font-semibold text-start  text-gray-700 mt-2 ">
                        React js MasterClass for Beginners
                    </p>
                    <div>
                        <Rating rating={3.5} reviews={45}></Rating>
                    </div>
                    <h2 className='text-2xl font-semibold text-gray-700 '>Description</h2>
                    <p className='whitespace-pre-line!'> A long, effective description paints a vivid and immersive picture in the reader's mind by using sensory details, figurative language, and a logical structure to "show" rather than simply "tell" the reader about the subject.
                        Key Elements of a Long Description
                        Sensory Details: Engage all five senses (sight, sound, smell, taste, and touch) to make the reader feel present in the scene. Instead of just saying a room is creepy, describe the mysterious smells and weird noises.
                        "Show, Don't Tell": Use specific, concrete details to create a mental image, allowing the reader to experience the scene for themselves. Telling: "The sunset was really cool." Showing: "Immense joy washed over me as the sunset's remarkable colors and breathtaking beauty captivated me".
                        Figurative Language: Employ similes (comparisons using "like" or "as") and metaphors (direct comparisons) to add depth, originality, and emotional resonance to your descriptions. For example, instead of saying a person ran fast, you might say they were "running like the wind".
                        Specific and Dynamic Word Choices: Use strong verbs, nouns, and precise adjectives and adverbs to avoid vague or clichéd language. Replace "a very old house" with "a house with paint curling off in thin strips".
                        Logical Organization: Structure your description in a way that makes sense. You could organize details spatially (e.g., top to bottom, near to far) or chronologically (for an event). Start with an overview and then move to specific, important details.
                        Point of View (POV): Filter the description through a character's perspective. Their emotions, motivations, and background influence what they notice and how they interpret their surroundings, which adds depth to both the description and the character.
                        Strategic Placement: Weave descriptions into the action of your narrative to avoid slowing the pace. Focus detailed descriptions on important elements or moments in the story, as readers tend to linger where the writer lingers.
                        Purpose and Meaning: Ensure the description serves a purpose beyond just painting a picture. It should convey a mood, foreshadow a future event, or reveal character traits to add value to the overall story.
                        By applying these techniques, you can craft a long description that is not only detailed but also engaging and memorable for your reader.</p>
                    <div className="flex items-center justify-between border-t-2 border-gray-300 pt-3 ">
                        <p className="flex gap-1 items-center text-gray-600"><Clock size={20} />23:23:00</p>

                    </div>
                </div>
            </Container>
        </>
    )
}

export default ViewCourse