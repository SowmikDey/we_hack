import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

function Landing() {
  const nextSectionRef = useRef(null);
  const middleSectionRef = useRef(null);


  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Justice_scale_silhouette%2C_medium.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">KnowYourRights</span>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link to="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>
              <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get started</Link>
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to="#Us" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                 onClick={(e) => {
                e.preventDefault();
                middleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
               >Features</Link>
                </li>
                
                <li>
                  <Link to="#contact" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    nextSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-2 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Know Your Rights. Protect Your Future.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Our platform leverages technology to bridge this gap, making legal literacy accessible to all.</p>
            <Link to="/signup" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
          </div>
          <div className=" h-[400px] lg:mt-0 lg:col-span-5 lg:flex">
            <iframe className="ml-28" src="https://lottie.host/embed/322b487b-1842-4897-8d47-4f25dae49807/GmUUueOQKn.lottie"></iframe>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Join a Community That Empowers You</h2>
          
        </div>
      </section>

      <section  ref={middleSectionRef}  id="Us"  className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Empowering Citizens Through Legal Knowledge</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here, we leverage technology to simplify legal information, ensuring everyone understands their rights and responsibilities for a more just and informed society.</p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://cdn3d.iconscout.com/3d/premium/thumb/legal-book-3d-icon-download-in-png-blend-fbx-gltf-file-formats--law-justice-constitution-criminal-and-pack-crime-security-icons-10018202.png?f=webp" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Awareness
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Learn it, understand it, apply it. Access easy-to-understand legal resources, stay informed about your rights, and make confident decisions with our legal awareness platform.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://cdn3d.iconscout.com/3d/premium/thumb/justice-support-3d-icon-download-in-png-blend-fbx-gltf-file-formats--legal-aid-advocacy-counseling-law-and-order-pack-crime-security-icons-10337109.png?f=webp" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Empowerment</h3>
              <p className="text-gray-500 dark:text-gray-400">Safeguard your rights, stay informed, and ensure compliance with our easy-to-use legal resources and structured guidance tailored for you.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://cdn3.iconfinder.com/data/icons/audit-and-compliance-1/64/Compliance_Automation-512.png" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Automation</h3>
              <p className="text-gray-500 dark:text-gray-400">Streamline legal processes, access rights-based guidance, and stay compliant effortlessly with automated tools and customizable templates designed for you.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://cdn-icons-png.flaticon.com/512/10240/10240329.png" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Compliance</h3>
              <p className="text-gray-500 dark:text-gray-400">A secure and reliable platform designed to simplify legal processes, ensure compliance, and protect your rights with confidence.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://cdn.iconscout.com/icon/premium/png-256-thumb/legal-services-3934109-3260527.png?f=webp" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Solutions</h3>
              <p className="text-gray-500 dark:text-gray-400">Create a seamless legal experience with user-friendly tools, collaborative resources, and expert insights to empower individuals and organizations alike.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <img 
               src="https://img.freepik.com/premium-vector/legal-research-icon-vector-image-can-be-used-legal-services_120816-309706.jpg" 
               alt="Profile Image" 
               className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
               />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Operations</h3>
              <p className="text-gray-500 dark:text-gray-400">Ensure smooth legal processes with structured workflows, compliance tools, and expert resources designed for individuals and organizations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-18 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-6 text-5xl font-extrabold text-gray-900 dark:text-white">Simplifying Legal Awareness</h2>
            <p className="mb-5 text-xl">We're advocates—dedicated to making legal knowledge accessible to all. Agile enough to adapt quickly, yet comprehensive enough to provide the depth and clarity you need.</p>
            
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">Start your free learning today</h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Try KnowYourRights Platform.</p>
                <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Start Trial</Link>
            </div>
        </div>
    </section>

    <footer ref={nextSectionRef} id="contact" className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <Link href="https://flowbite.com" className="flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Justice_scale_silhouette%2C_medium.svg" className="mr-3 mb-10 h-8" alt="FlowBite Logo" />
                        <span className="self-center mb-10 text-2xl font-semibold whitespace-nowrap dark:text-white">KnowYourRights</span>
                    </Link>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                                <Link to="https://x.com/SowmikD22343" className="hover:underline ">X</Link>
                            </li>
                            <li>
                                <Link to="https://www.linkedin.com/in/sowmik-dey-8390a827b/" className="hover:underline">LinkedIn</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <Link href="#" className="hover:underline">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contacts</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                                <Link href="#" className="hover:underline">+919830869972</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">sowmikdey23@gmail.com</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link href="#" className="hover:underline">Your website</Link>. All Rights Reserved.</span>
            </div>
      </footer>
    </div>
  )
}

export default Landing