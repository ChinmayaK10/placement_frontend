const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const replacements = [
  // 1. PLATFORM NAME
  ['Lithium AI', 'PLACERA X'],
  ['Lithium AI &mdash; AI agency cinematic experience.', 'PLACERA X &mdash; Intelligence For Career Readiness'],
  ['Lithium AI — AI agency cinematic experience.', 'PLACERA X — Intelligence For Career Readiness'],
  
  // HERO
  [/WE\\'RE AN AI AGENCY/g, 'INTELLIGENCE FOR CAREER READINESS'],
  [/Uncover the Unknown With AI/g, 'Transform Potential Into Placement Success'],
  [/We provide companies with the latest AI tools to accelerate growth/g, 'AI-powered placement intelligence that analyzes your skills, identifies career gaps, and guides you toward your dream company.'],
  
  // CTAs
  [/Book a Demo/gi, 'Start AI Assessment'],
  [/GET IN TOUCH/g, 'EXPLORE INTELLIGENCE SYSTEM'],
  
  // SECTION TEXT
  [/Security You Can Rely On/gi, 'Placement Readiness Score'],
  [/SECURED/gi, 'ANALYSIS'],
  [/Elevating Your Experience/gi, 'Skill Match Index'],
  [/ADVANTAGES/gi, 'GAP DETECTION'],
  [/Discover the unparalleled benefits that differentiate us from the competition and enhance your journey with us\./gi, 'Get actionable placement intelligence to analyze skill gaps, predict placement probability, and match with the top tech companies.'],
  
  [/BENEFITS/gi, 'INSIGHTS'],
  [/Key Metrics &amp; Insights/gi, 'AI Career Insights'],
  ['Key Metrics & Insights', 'AI Career Insights'],
  ['Metric insights', 'Placement Insights'], 
  ['280+', '82%'],
  ['Clients', 'Match Probability'],
  ['96.4+', '9/10'],
  ['Satisfaction', 'Resume Strength'],

  [/FULLY AI/gi, 'EVALUATE'],
  [/Automate Your Digital Strategy/gi, 'Mock Interview Simulator'],

  [/ACCELERATE TODAY/gi, 'START PREPARATION'],
  [/lithium aI:<br id="i947el"\/>the game changer/gi, 'PLACERA X:<br id="i947el"/>placement ready'],

  [/AI IS THE FUTURE/gi, 'YOUR CAREER ROADMAP'],
  [/Empowering Companies to Achieve Excellence with Cutting-edge AI Technologies and Automated Processes\./gi, 'Master DSA progression, project development, and aptitude preparation with our personalized learning roadmap.'],

  ['500+', '100+'],
  ['AI projects completed', 'Mock Interviews Delivered'],
  ['98%', '95%'],
  ['Client satisfaction rate', 'Placement Readiness Rate'],
  ['15+', '50+'],
  ['Years of industry experience', 'Company Match Engine Profiles'],
  ['30%', '40%'],
  ['Average cost reduction', 'Skill Gap Reduction'],

  ['Processes we go through', 'Placement Intelligence Dashboard'],
  ['Discovery and Consultation', 'Technical Competency'],
  ['We start by understanding your business needs and goals to identify the best AI solutions.', 'We start by evaluating your technical skills, problem solving ability, and coding performance.'],
  ['Custom Strategy Development', 'Personalized Learning Roadmap'],
  ['Our experts design a tailored AI strategy to meet your specific requirements.', 'Our AI generates a tailored preparation progression to fill your skill gaps.'],
  ['Implementation and Integration', 'Resume & ATS Optimization'],
  ['We deploy and integrate AI technologies seamlessly into your existing systems.', 'We analyze missing technical keywords and improve project descriptions for recruiters.'],
  ['Training and Support', 'Mock Interview Simulation'],
  ['We provide comprehensive training and ongoing support to ensure successful adoption.', 'We provide technical interview simulation and HR round analysis to build confidence.'],
  ['Monitoring and Optimization', 'Company Matching'],
  ['Continuous monitoring and optimization to keep your AI systems performing at their best.', 'Continuous matching to see if you are eligible for mid-tier product companies like Amazon and Microsoft.'],

  ['services', 'features'],
  ['Services we provide', 'AI Career Assessment'],
  ['AI Consulting', 'Skill Gap Detection'],
  ['Expert guidance to help you understand and leverage AI technologies for your business.', 'Intelligent profiling to find missing skills.'],
  ['Custom AI Development', 'Resume Analyzer'],
  ['Creating bespoke AI solutions tailored to your unique business needs and challenges.', 'ATS compatibility scoring and project optimization.'],
  ['Automation Solutions', 'Company Match Engine'],
  ['Implementing automation technologies to streamline and enhance work efficiency.', 'Match with companies like Google, Microsoft, Amazon, Oracle.'],
  
  ['OUR WORK', 'COMPANIES'],
  ['Projects we worked on', 'Top Tech Recruiters'],
  ['ChatGPT', 'Google'],
  ['Gemini AI', 'Microsoft'],
  ['Midjourney', 'Amazon'],
  
  ['PRICING', 'MATCHING'],
  ['Affordable pricing', 'Company Eligibility'],
  ['Basic', 'Infosys'],
  ['Perfect for small businesses', 'Service Based IT'],
  ['$79', '3-5'],
  ['per month', 'LPA Expected'],
  ['Get started', 'View Eligibility'],
  ['Initial consultation', 'Aptitude Readiness'],
  ['Basic AI integration', 'Basic Java/C++'],
  ['Email support', 'Communication Skills'],
  ['Access to standard AI tools', 'Standard Interview'],
  ['Monthly performance reports', 'High Volume Drive'],

  ['Pro', 'Oracle'],
  ['Perfect for growing businesses', 'Mid-Tier Product'],
  ['$199', '10-15'],
  ['Comprehensive AI strategy', 'Algorithm Optimization'],
  ['Advanced AI integration', 'System Design Base'],
  ['Priority email support', 'Technical Review'],
  ['Access to premium AI tools', 'Core CS Subjects'],
  ['Bi-weekly performance reports', 'Advanced DSA'],
  
  ['Enterprise', 'Amazon'],
  ['Perfect for larger businesses', 'FAANG / MAANG'],
  ['$799', '25-45'],
  ['Dedicated AI consultant', 'Advanced System Design'],
  ['Custom AI development', 'Leadership Principles'],
  ['24/7 support', 'High Scalability Concepts'],
  ['Access to all AI tools', 'Hard Leetcode Solutions'],
  ['Weekly performance reports', 'Bar Raiser Prep'],

  ['Their AI solutions boosted our efficiency and transformed our operations. Highly recommended!', 'Their ATS optimization increased my resume selection rate significantly. Highly recommended!'],
  ['James A.', 'Rahul K.'],
  ['Data Scientist', 'SDE 1 at Google'],

  ['Top-notch AI models that provided invaluable customer insights. Excellent support!', 'The mock interviews simulated exactly what FAANG companies asked. Invaluable prep!'],
  ['Emma J.', 'Priya M.'],
  ['AI Research Scientist', 'Frontend Developer at Amazon'],

  ['Cutting-edge technology and exceptional service. Boosted our productivity significantly.', 'The personalized learning roadmap guided me from zero to an offer at Microsoft.'],
  ['Sophia M.', 'Anjali R.'],
  ['Machine Learning Engineer', 'SDE at Microsoft'],

  ['ABOUT', 'COMMUNITY'],
  ['Meet the Team', 'Our Mentors'],
  ['Our dedicated team is driven by innovation and a passion for excellence. With a shared vision, we strive to revolutionize the NFT space and bring unique digital art to collectors worldwide.', 'Our dedicated mentors are driven by a passion for teaching. We guide students to identify skill gaps, crack interviews, and land placements at their dream companies.'],
  ['John Doe', 'Sundar P.'],
  ['Founder &amp; CEO', 'Senior Engineer'],
  ['Jane Doe', 'Satya N.'],
  ['CDO', 'Tech Lead'],
  ['Alex Doe', 'Andy J.'],
  ['CTO', 'Engineering Manager'],

  ['Join the AI Revolution', 'Start Your Placement Journey'],
  ['CONTACT US', 'START ASSESSMENT'],
  ['hello@lithium.peachworlds', 'support@placerax.io']
];

for (const [search, replace] of replacements) {
    if (search instanceof RegExp) {
        html = html.replace(search, replace);
    } else {
        const splitText = html.split(search);
        if (splitText.length > 1) {
            html = splitText.join(replace);
        }
    }
}

// Ensure the loading script text is updated
html = html.replace('Preparing your cinematic experience...', 'Preparing Career Intelligence...');
html = html.replace('Loading 3D Engine...', 'Analyzing Placement Readiness...');

fs.writeFileSync('public/index.html', html);
console.log('Replaced texts successfully');
