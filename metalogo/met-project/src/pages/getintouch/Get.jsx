import React from 'react'
import { FiHeadphones } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa6";

const Get = () => {
    return (
        <div className='md:grid-cols-2 grid-cols-1 '>

            {/* Right Description */}
            <div>
                <h1>Get In Touch</h1>

                <p>
                    Let's Kickstart Your Project
                </p>

                <p>
                    Ready to take the next step? Fill out the form to schedule a consultation with our experts.
                </p>
                 
                 {/* Expert Card */}
                <div>
                   {/* Customer Support part */}
                    <div>
                        <FiHeadphones />
                        <div>
                            <h1>
                                Customer Support
                            </h1>
                            <p>
                                Need a technical Assistance?
                                <span>
                                    Contact Support
                                </span>
                            </p>

                        </div>
                    </div>
                    
                    {/* Partnerships Part */}
                    <div>
                           <FaHandshake />
                           <div>
                              <h1>
                                Partnerships
                              </h1>
                              <p>
                                Want to offer MetaLogic to your client ?
                                <span>
                                    Become a <a>Partner</a>
                                </span>
                              </p>
                           </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Get