/* ==========================================================================
   SKILLCRAFT AI - COMPREHENSIVE IT ROLES & JOB DESCRIPTIONS
   ========================================================================== */

const JOBS_DATA = {
    "Full Stack Developer": `Position: Senior Full Stack Developer
Company: CloudScale Solutions
Location: Remote / San Francisco, CA

Job Summary:
We are seeking an experienced Senior Full Stack Developer to build and maintain high-performance, responsive web applications. In this role, you will design and develop clean user interfaces using modern frontend frameworks and construct robust, scalable API microservices on the backend. You will collaborate closely with product managers and system designers to transform technical specifications into stable, production-ready software.

Requirements & Technical Competencies:
- 5+ years of software engineering experience.
- Strong proficiency in modern HTML5, CSS3, JavaScript, and TypeScript.
- Deep expertise in React.js, Next.js, Redux, and Tailwind CSS.
- Extensive backend development experience using Node.js, Express, or Python (FastAPI/Django).
- Experience designing and optimizing relational (PostgreSQL) and NoSQL (MongoDB) databases.
- DevOps familiarity: Docker containers, CI/CD pipelines (GitHub Actions), and AWS core services (S3, EC2, RDS).
- Solid understanding of Git workflows, unit testing, and agile scrum methodologies.`,

    "Frontend Developer": `Position: Senior Frontend Developer
Company: PixelPerfect Design
Location: Austin, TX / Remote

Job Summary:
We are looking for a creative and performance-oriented Frontend Developer to spearhead our user interface development. You will translate beautiful design wireframes into semantic, responsive, and pixel-perfect web pages. A major focus of this role will be optimizing interface performance, ensuring modular component structures, and building rich, accessible user experiences.

Requirements & Technical Competencies:
- 4+ years of dedicated frontend development experience.
- Expert knowledge of vanilla JavaScript, ES6+, TypeScript, and CSS layouts (Flexbox, Grid).
- Advanced expertise with React.js, Vue.js, or Angular.
- Strong understanding of state management libraries (Redux, Pinia, Context API).
- Experience with CSS preprocessors (SASS/SCSS) and modern utility systems like Tailwind CSS.
- Familiarity with build tools such as Vite, Webpack, and Web Accessibility Guidelines (WCAG 2.1).
- Strong collaboration skills with UI/UX designers using Figma templates.`,

    "Backend Developer": `Position: Senior Backend Developer
Company: DataStream Systems
Location: New York, NY / Remote

Job Summary:
We are seeking a Backend Developer to engineer high-throughput systems, scalable APIs, and secure data services. You will design database schemas, configure background processing queues, integrate third-party services, and optimize server-side workloads. The ideal candidate cares deeply about API response times, secure authentication protocols, and scalable software design patterns.

Requirements & Technical Competencies:
- 5+ years of backend development experience.
- Advanced expertise in Python (Django/FastAPI), Node.js (Express/NestJS), or Go.
- Strong proficiency in SQL database design, query indexing, and caching layers (Redis/Memcached).
- Expertise designing RESTful and GraphQL APIs.
- Experience with background queues and message brokers (RabbitMQ, Celery, Apache Kafka).
- Familiarity with Docker containers and deployment to cloud platforms (AWS, GCP).
- Experience implementing OAuth2, JWT tokens, and secure encryption standards.`,

    "MERN Stack Developer": `Position: MERN Stack Developer
Company: WebInnovate Corp
Location: Remote

Job Summary:
We are looking for a MERN Stack Developer to build full-stack web applications utilizing MongoDB, Express, React, and Node.js. You will take ownership of features from start to finish—designing NoSQL schemas, developing RESTful APIs, and implementing reusable web components. This is a highly collaborative role requiring speed, quality, and a passion for Javascript/TypeScript technologies.

Requirements & Technical Competencies:
- 3+ years of full-stack development experience using the MERN ecosystem.
- Strong experience building single-page applications (SPAs) with React.js.
- Robust Node.js and Express API development skills.
- Mastery of MongoDB database modeling, aggregation pipelines, and Mongoose ORM.
- Proficiency in HTML5, CSS3, SASS, and modern state-management structures.
- Familiarity with JWT authorization, security headers, and CORS configurations.
- Experience with testing tools (Jest, Mocha) and cloud hosting (Heroku, AWS).`,

    "MEAN Stack Developer": `Position: MEAN Stack Developer
Company: EnterpriseWeb Systems
Location: Remote / Chicago, IL

Job Summary:
We are seeking a MEAN Stack Developer to design and develop enterprise-level full-stack applications using MongoDB, Express, Angular, and Node.js. You will be responsible for creating robust server architectures, highly structured Angular modules, and scalable database schemas. Clean code practices and deep understanding of TypeScript are essential for this role.

Requirements & Technical Competencies:
- 3+ years of professional development experience using the MEAN stack.
- Mastery of Angular (v12+), TypeScript, RxJS, and Angular CLI.
- Experience building RESTful API endpoints using Node.js and Express.
- Strong understanding of MongoDB and document-oriented database design.
- Familiarity with Angular architectural patterns, services, directives, and routing modules.
- DevOps competencies: Docker containers, linting tools, and automated deployment pipelines.`,

    "React Developer": `Position: React Developer (Frontend Specialist)
Company: InteractiveApps
Location: Remote

Job Summary:
We are looking for a dedicated React Developer to join our frontend team. You will focus on building interactive, highly responsive, and modular single-page applications. Your key responsibilities will include writing clean, reusable components, managing state efficiently across complex trees, and collaborating with backend engineers to integrate RESTful endpoints.

Requirements & Technical Competencies:
- 3+ years of focused React development experience.
- In-depth knowledge of React 18, React Hooks, custom hooks, and the Virtual DOM.
- Strong proficiency in JavaScript (ES6+), TypeScript, and CSS3.
- Proven experience with state managers: Redux Toolkit, MobX, or Recoil.
- Experience with client-side routing (React Router) and asynchronous data fetching (Axios, React Query).
- Understanding of performance metrics: lazy loading, code splitting, and memoization.`,

    "Angular Developer": `Position: Angular Developer
Company: FinTech Solutions
Location: Charlotte, NC / Remote

Job Summary:
We are seeking an Angular Developer to build complex, reliable client-side applications for our financial services platform. You will construct modular Angular architectures, manage asynchronous data streams using RxJS, and write unit tests to ensure high application coverage. The candidate should be highly proficient in TypeScript and enterprise-grade frontend design patterns.

Requirements & Technical Competencies:
- 3+ years of professional software engineering with Angular.
- Expert level skills in TypeScript, RxJS, and Angular architectural designs (Modules, Components, Services, Guards).
- Strong proficiency in HTML5, SCSS/CSS Grid, and Bootstrap/Angular Material.
- Experience with state management patterns (NgRx, Akita).
- Knowledge of testing frameworks: Jasmine, Karma, or Jest.
- Understanding of HTTP protocols, interceptors, and lazy loading strategies.`,

    "Node.js Developer": `Position: Node.js Developer
Company: ConnectAPI Systems
Location: Remote

Job Summary:
We are seeking a Node.js Backend Developer to build scalable, real-time networking and database APIs. Your main tasks will include designing low-latency server applications, configuring real-time communication sockets, and integrating multi-tier database systems. A solid understanding of event-driven asynchronous execution and Javascript/TypeScript is crucial.

Requirements & Technical Competencies:
- 4+ years of professional experience using Node.js.
- Strong knowledge of Express.js, NestJS, or Fastify frameworks.
- Deep familiarity with asynchronous event loops, streams, and buffer operations.
- Experience with real-time web sockets (Socket.io) and RESTful API structures.
- Practical experience with databases: PostgreSQL/MySQL and Redis.
- Comprehensive knowledge of testing suites (Supertest, Jest) and Git.`,

    "Python Developer": `Position: Python Software Engineer
Company: PyData Technologies
Location: Remote / Seattle, WA

Job Summary:
We are looking for a Python Developer to join our core backend engineering team. You will write clean, well-tested Python code to handle complex algorithms, build web applications, and orchestrate background processing systems. You will collaborate with data teams and frontend developers to create a seamless, integrated technology platform.

Requirements & Technical Competencies:
- 4+ years of professional Python development experience.
- Expert-level knowledge of Django, Flask, or FastAPI.
- Solid understanding of SQL database design, ORMs (SQLAlchemy, Django ORM), and migrations.
- Experience writing multi-threaded, asynchronous, or multiprocess code in Python.
- Familiarity with package management (pip, Poetry), Pytest, and linters (Flake8, Black).
- Basic understanding of containerization (Docker) and deployment pipelines.`,

    "Java Developer": `Position: Enterprise Java Developer
Company: Global Systems Group
Location: Denver, CO / Remote

Job Summary:
We are seeking an Enterprise Java Developer to build modular microservices and high-availability core business systems. You will design, build, and debug Spring Boot applications, implement secure endpoints, and configure database integrations. The candidate must be comfortable working in a collaborative corporate environment following Agile practices.

Requirements & Technical Competencies:
- 5+ years of software development experience in Java (Java 11/17).
- Deep expertise in Spring Framework, Spring Boot, Spring Security, and Spring Data.
- Strong database skills using Hibernate/JPA, PostgreSQL, or Oracle SQL.
- Strong understanding of microservices architecture, REST APIs, and message brokers (Kafka/ActiveMQ).
- Experience with testing tools: JUnit, Mockito, and database mock setups.
- Experience with Maven, Gradle, and CI/CD tools (Jenkins, GitLab CI).`,

    ".NET Developer": `Position: Senior .NET Software Engineer
Company: CoreTech Systems
Location: Remote

Job Summary:
We are looking for a .NET Software Engineer to build scalable, high-performance web applications and backend APIs. You will design, implement, and maintain software utilizing C#, .NET Core, and ASP.NET Core. You will collaborate on database integrations, configure secure authentication, and leverage Azure cloud services to deploy production assets.

Requirements & Technical Competencies:
- 4+ years of experience with C#, .NET Core, and ASP.NET Core Web APIs.
- Experience with Entity Framework Core, LINQ, and SQL Server database modeling.
- Solid understanding of object-oriented design patterns, dependency injection, and clean architecture.
- Familiarity with authentication schemas (JWT, IdentityServer) and cloud deployments (Azure App Services).
- In-depth understanding of unit testing with xUnit, NUnit, or MSTest.`,

    "PHP Developer": `Position: PHP Laravel Developer
Company: WebCraft Ventures
Location: Remote

Job Summary:
We are seeking a PHP Developer specializing in Laravel to build robust web portals, e-commerce architectures, and backend administration panels. You will write maintainable PHP code, structure MVC layouts, customize DB schemas, and integrate payment gateways. Strong database optimization skills and RESTful API integrations are key.

Requirements & Technical Competencies:
- 3+ years of experience in PHP web development.
- Expert knowledge of the Laravel framework, Eloquent ORM, and Blade templating.
- Proficiency in MySQL database design, indexing, and raw query optimizations.
- Solid understanding of JavaScript, HTML5, CSS3, and AJAX/Fetch operations.
- Experience with Composer, Git, PHPUnit testing, and third-party API configurations.`,

    "Mobile App Developer": `Position: Mobile App Developer (Cross-Platform)
Company: MobileFirst Studio
Location: Los Angeles, CA / Remote

Job Summary:
We are looking for a Mobile App Developer to build beautiful, high-performing apps for both iOS and Android platforms. You will use cross-platform frameworks to deploy fast, responsive applications that interact seamlessly with backend REST APIs. The role requires a strong focus on mobile performance tuning, offline caching, and user interface aesthetics.

Requirements & Technical Competencies:
- 3+ years of mobile application development experience.
- Strong proficiency in React Native (JavaScript/TypeScript) or Flutter (Dart).
- Experience integrating mobile apps with backend RESTful APIs and WebSockets.
- In-depth understanding of mobile state management, local database storage (SQLite, WatermelonDB, Hive).
- In-depth knowledge of iOS App Store Connect and Android Google Play Console deployment processes.
- Understanding of mobile UI layouts, animation guidelines, and device compatibility optimization.`,

    "Android Developer": `Position: Android Engineer
Company: AppDynamics Inc
Location: Remote

Job Summary:
We are seeking a dedicated Android Developer to build and enhance applications for Android devices. You will write native code, implement modern design guidelines, optimize memory usage, and build smooth user interactions. You will collaborate with design teams and product leads to roll out robust mobile updates.

Requirements & Technical Competencies:
- 3+ years of native Android application development.
- Mastery of Kotlin, Java, and Android SDK core components.
- Experience with Jetpack Compose, architectural guidelines (MVVM/MVI), and Android Jetpack libraries.
- Strong skills in local database storage (Room) and network requests (Retrofit, Coroutines).
- In-depth understanding of Google Material Design guidelines and Android memory/battery profiling.
- Experience with publishing apps to the Google Play Store.`,

    "iOS Developer": `Position: iOS Developer
Company: Cupertino Apps
Location: Remote / San Francisco, CA

Job Summary:
We are looking for an iOS Developer to build elegant native applications for the Apple ecosystem. You will craft high-performance views, configure local data synchronizations, write unit tests, and publish releases to the App Store. A passionate dedication to the Apple HIG (Human Interface Guidelines) and high-quality UI animations is essential.

Requirements & Technical Competencies:
- 3+ years of native iOS development experience.
- Expert-level skills in Swift, Xcode, UIKit, and SwiftUI.
- Experience with iOS architectural patterns: MVC, MVVM, or Coordinator.
- Proficient in Apple frameworks (Core Data, Core Animation) and package managers (Cocoapods, Swift Package Manager).
- Mastery of Auto Layout, constraints, and interface builders.
- Experience managing the TestFlight beta lifecycle and Apple Developer Portal.`,

    "Software Engineer": `Position: Software Engineer
Company: CoreLogic Tech
Location: Remote / Boston, MA

Job Summary:
We are seeking a Software Engineer to join our core systems engineering division. In this role, you will apply computer science principles to design, develop, and maintain clean, scalable software systems. You will collaborate across teams to implement software specifications, fix bugs, optimize performance, and write comprehensive automated tests.

Requirements & Technical Competencies:
- 3+ years of software development experience in Python, Java, C++, or Go.
- Solid understanding of data structures, algorithms, runtime complexities, and design patterns.
- Strong experience with object-oriented programming (OOP) and system design.
- Proficiency with Git version control, relational databases (SQL), and Linux operating environments.
- Experience writing automated tests (Unit, Integration) and participating in code reviews.`,

    "Software Developer": `Position: Software Developer
Company: Systemic Solutions
Location: Remote

Job Summary:
We are seeking a Software Developer to build, document, and test modern business applications. You will be responsible for translating project specifications into working code, designing database tables, writing APIs, and debugging system errors. Good communication skills and a solid understanding of the Software Development Life Cycle (SDLC) are required.

Requirements & Technical Competencies:
- 3+ years of professional development experience (Javascript, Python, or C#).
- Solid experience in web application development, HTML5, CSS3, and relational databases.
- Practical knowledge of Git, RESTful API integrations, and Agile Scrum methodologies.
- Ability to write clean, self-documenting code and maintain comprehensive technical readmes.`,

    "DevOps Engineer": `Position: DevOps Engineer
Company: CloudScale Infrastructure
Location: Remote / Seattle, WA

Job Summary:
We are seeking a DevOps Engineer to manage, automate, and scale our cloud infrastructure and deployment pipelines. In this role, you will build and support robust CI/CD paths, implement Infrastructure as Code (IaC), monitor application health, and ensure server security. You will bridge the gap between development and operations teams to guarantee high system reliability.

Requirements & Technical Competencies:
- 4+ years of DevOps or Site Reliability Engineering experience.
- Proficient in Linux system administration and shell scripting (Bash, Python).
- Expert skills in Docker containerization and Kubernetes cluster orchestration.
- Deep experience with Infrastructure as Code using Terraform or Ansible.
- Strong knowledge of CI/CD pipeline automation (GitHub Actions, GitLab CI, Jenkins).
- Solid experience with cloud providers (AWS, GCP, or Azure) and monitoring suites (Prometheus, Grafana, ELK stack).`,

    "Cloud Engineer": `Position: Cloud Platform Engineer
Company: Nexus Cloud Labs
Location: Remote

Job Summary:
We are looking for a Cloud Engineer to design, deploy, and optimize our cloud infrastructure. You will be responsible for configuring network resources, setting up secure access control, managing storage assets, and ensuring high system availability. You will work closely with developers to ensure seamless deployments onto cloud environments.

Requirements & Technical Competencies:
- 3+ years of hands-on cloud administration and configuration experience.
- Certification in AWS (SysOps/Architect), Azure (Administrator), or Google Cloud.
- Strong experience with cloud networking (VPC, DNS, Load Balancers, VPNs) and security models (IAM).
- Knowledge of container tools (Docker) and basic shell scripting (Python, Bash).
- Understanding of serverless architectures and auto-scaling setups.`,

    "AWS Engineer": `Position: AWS Solutions Specialist
Company: AWS CloudTech
Location: Remote / Seattle, WA

Job Summary:
We are seeking a dedicated AWS Cloud Engineer to design, manage, and optimize our Amazon Web Services (AWS) architectures. You will deploy serverless components, secure access pathways, audit resource spending, and write cloud infrastructure scripts. Deep understanding of the AWS Well-Architected Framework is crucial.

Requirements & Technical Competencies:
- 4+ years of dedicated AWS infrastructure engineering.
- AWS Certified Solutions Architect (Associate or Professional).
- Expert-level command over AWS Core services: EC2, S3, RDS, Lambda, VPC, Route53, IAM.
- Mastery of CloudFormation, Terraform, or AWS CDK for automated provisioning.
- Experience setting up CloudWatch dashboards, CloudTrail logs, and AWS Config.
- Robust knowledge of AWS ECS/EKS container deployments.`,

    "Azure Engineer": `Position: Azure Cloud Engineer
Company: Microsoft Enterprise Partner
Location: Remote

Job Summary:
We are looking for an Azure Engineer to design, implement, and maintain our enterprise infrastructure on Microsoft Azure. You will provision resources, configure Virtual Networks, set up Active Directory access, and optimize service scaling. The role focuses heavily on Azure resource management and system security.

Requirements & Technical Competencies:
- 3+ years of Azure cloud engineering experience.
- Microsoft Certified: Azure Administrator or Azure Solutions Architect.
- Strong experience with Azure VMs, App Services, Blob Storage, Azure SQL, CosmosDB, and Azure AD.
- Experience building IaC templates using Azure Bicep, ARM templates, or Terraform.
- Familiarity with Azure Monitor, Application Insights, and Azure Security Center.`,

    "Data Analyst": `Position: Senior Data Analyst
Company: InfoMetrics Inc
Location: Remote / Chicago, IL

Job Summary:
We are seeking a Data Analyst to translate raw metrics into actionable business insights. You will compile reports, construct interactive dashboards, identify market trends, and clean complex datasets. The candidate must possess strong analytical capabilities and be comfortable presenting metrics to stakeholders.

Requirements & Technical Competencies:
- 3+ years of experience as a Data Analyst.
- Advanced SQL querying skills (joins, aggregations, window functions, CTEs).
- Proficiency with data visualization dashboards: Tableau, Power BI, or Looker.
- Robust experience cleaning and analyzing data using Python (Pandas, NumPy) or R.
- Solid understanding of statistical analysis (A/B testing, regression models).
- Strong communication skills to report findings to business leaders.`,

    "Data Scientist": `Position: Data Scientist
Company: DeepMind Analytics
Location: San Francisco, CA / Remote

Job Summary:
We are seeking a Data Scientist to build predictive models, design statistical algorithms, and run complex data mining operations. You will explore structured and unstructured data, design model validation schemas, and construct ETL data pipelines. This role bridges the gap between deep mathematical modeling and product feature scaling.

Requirements & Technical Competencies:
- 4+ years of experience in data science, predictive modeling, or statistics.
- Strong Python programming skills using Pandas, NumPy, Scikit-Learn, and SciPy.
- In-depth understanding of ML algorithms: Decision Trees, Random Forests, XGBoost, Clustering.
- Solid understanding of probability, mathematical statistics, and statistical testing.
- Experience with SQL databases and data lake storage models.
- Familiarity with deep learning frameworks (TensorFlow, PyTorch) is a plus.`,

    "Machine Learning Engineer": `Position: Machine Learning Engineer
Company: AutonomousSystems
Location: Remote

Job Summary:
We are looking for a Machine Learning Engineer to design, train, and deploy advanced machine learning models into production pipelines. You will optimize inference speeds, establish model monitoring setups, configure feature stores, and orchestrate ML training jobs. The role focuses on bridging the gap between ML models and robust system software.

Requirements & Technical Competencies:
- 4+ years of professional engineering experience with ML models in production.
- Expert-level Python skills and deep expertise in TensorFlow, PyTorch, or JAX.
- In-depth experience with ML pipelines and orchestration (Kubeflow, MLflow, Airflow).
- Strong understanding of model training strategies, hyperparameter tuning, and data preprocessing.
- DevOps skills for ML: Docker containerization, GPU resource allocation, and cloud APIs.
- Background in linear algebra, calculus, and mathematical statistics.`,

    "AI Engineer": `Position: Generative AI Engineer
Company: SkillCraft AI Labs
Location: Remote / San Francisco, CA

Job Summary:
We are seeking an AI Engineer to lead the integration of Large Language Models (LLMs) and cognitive services into our core SaaS systems. You will build intelligent agents, design optimized prompt flows, manage embeddings pipelines, and configure vector search engines. The ideal candidate stays on the cutting edge of generative AI systems.

Requirements & Technical Competencies:
- 3+ years of experience in AI/ML software engineering.
- Deep expertise in OpenAI APIs, Anthropic APIs, and open-source models (Llama, Mistral).
- Expert-level command over orchestrator frameworks: LangChain, LlamaIndex, or AutoGen.
- Strong experience with Vector Databases: Pinecone, ChromaDB, Qdrant, or pgvector.
- Proficient in Python, API integration, and asynchronous response streaming.
- Solid understanding of semantic search, tokenization, and RAG (Retrieval-Augmented Generation) patterns.`,

    "Business Analyst": `Position: Business Systems Analyst
Company: Enterprise Ventures
Location: Remote

Job Summary:
We are seeking a Business Analyst to collaborate with key stakeholders, document product requirements, and map out technical process flows. You will run stakeholder workshops, create detailed user stories, build process flow diagrams, and act as a bridge between the business leadership and the development team.

Requirements & Technical Competencies:
- 3+ years of experience as a Business Analyst in an IT or software environment.
- Strong experience writing detailed software requirements, functional specifications, and user stories.
- In-depth knowledge of Agile Scrum frameworks and Jira/Confluence.
- Proficiency in process mapping using Visio, Lucidchart, or Draw.io.
- Strong verbal and written communication, negotiation, and analytical skills.`,

    "QA Engineer": `Position: Quality Assurance Engineer
Company: BugFree Tech
Location: Remote

Job Summary:
We are looking for a QA Engineer to design, write, and execute manual and automated test cases to ensure the highest standards of software quality. You will identify bugs, document reproduction steps, verify hotfixes, and participate in sprint planning to advocate for software testing best practices.

Requirements & Technical Competencies:
- 3+ years of software QA testing experience.
- Proven experience writing detailed test plans, test cases, and bug logs.
- Familiarity with bug tracking databases, specifically Jira and TestRail.
- Experience with web testing tools: Chrome Developer Tools, Postman API testing.
- Basic understanding of automated testing frameworks (Selenium, Cypress) is highly desirable.
- Detail-oriented mindset with excellent troubleshooting capabilities.`,

    "Automation Tester": `Position: QA Automation Engineer
Company: AutoQA Systems
Location: Remote

Job Summary:
We are seeking an Automation Tester to build, expand, and maintain our automated regression suites. You will write automated tests for web, mobile, and API layers, configure testing frameworks, and integrate test suites directly into CI/CD pipelines. This role is highly programmatic and aims to minimize manual regression cycles.

Requirements & Technical Competencies:
- 3+ years of programmatic test automation experience.
- In-depth programming skills in JavaScript/TypeScript, Java, or Python.
- Mastery of modern automation frameworks: Playwright, Cypress, or Selenium.
- Experience with API testing automation using Postman or Supertest.
- Familiarity with running automated test suites in CI/CD environments (GitHub Actions, Jenkins).
- Solid knowledge of Git, DOM selection, and Page Object Model design patterns.`,

    "Manual Tester": `Position: QA manual Tester
Company: QualityFirst Ltd
Location: Remote

Job Summary:
We are looking for a Manual Tester to execute exploratory, functional, and usability test runs across our web and mobile applications. You will review product spec sheets, write step-by-step test plans, verify user paths, and document regression issues. The ideal candidate is thorough, detail-oriented, and understands user interaction quirks.

Requirements & Technical Competencies:
- 2+ years of manual software testing experience.
- Exceptional capability to document clear bug reproduction steps and severity levels.
- Experience in functional, usability, cross-browser, and regression testing methodologies.
- Proficiency in web developer tools and mobile simulators.
- Strong written communication skills and active team participation in Agile environments.`,

    "Cybersecurity Analyst": `Position: Cybersecurity Analyst
Company: Shield Security
Location: Remote / New York, NY

Job Summary:
We are seeking a Cybersecurity Analyst to monitor threat environments, investigate security alerts, and execute vulnerability assessments. You will review firewall configurations, configure intrusion detection systems, audit access logs, and help implement compliance standards to secure user data assets.

Requirements & Technical Competencies:
- 3+ years of experience in cybersecurity operations or network security.
- Deep familiarity with networking models (TCP/IP), firewalls, SIEM tools (Splunk, QRadar), and IDS/IPS systems.
- Experience conducting vulnerability scans using Nessus, Qualys, or Burp Suite.
- Knowledge of compliance standards: SOC 2, ISO 27001, GDPR, or PCI-DSS.
- Cybersecurity certification: CompTIA Security+, CEH, or CISSP (Associate).
- In-depth understanding of common web application vulnerabilities (OWASP Top 10).`,

    "Network Engineer": `Position: Network Infrastructure Engineer
Company: Telecom Connect
Location: Austin, TX / Remote

Job Summary:
We are looking for a Network Engineer to design, deploy, and maintain stable corporate and data-center networks. You will configure routers, switches, VPN tunnels, and firewalls to ensure high network uptime, low latency, and secure pathways. The candidate will troubleshoot network drops and plan infrastructure hardware upgrades.

Requirements & Technical Competencies:
- 4+ years of dedicated network administration and engineering.
- Certification: Cisco CCNA or CCNP.
- Advanced configuration skills with Cisco, Juniper, or Arista network switches and routers.
- In-depth understanding of routing protocols (BGP, OSPF, EIGRP), VLANs, DNS, and IP address management.
- Experience deploying and securing Enterprise VPNs and Next-Gen Firewalls (Palo Alto, Fortinet).
- Familiarity with network analysis tools (Wireshark) and SNMP monitors.`,

    "Database Administrator": `Position: Database Administrator (DBA)
Company: SQLPower Databases
Location: Remote

Job Summary:
We are seeking a Database Administrator to optimize query performance, manage backup schemas, configure replication paths, and ensure high database reliability. You will monitor CPU loads, diagnose lock contentions, implement tablespace allocations, and manage secure data migrations.

Requirements & Technical Competencies:
- 4+ years of professional Database Administration experience.
- Deep expertise in PostgreSQL, MySQL, or Oracle SQL databases.
- Mastery of query indexing, transaction isolation, profiling, and query plans (EXPLAIN).
- Experience setting up automated DB backups, point-in-time recovery (PITR), and high-availability replication.
- In-depth knowledge of database security, user management, and encryption at rest.`,

    "UI/UX Designer": `Position: UI/UX Product Designer
Company: StudioDesign Co
Location: Remote / San Francisco, CA

Job Summary:
We are seeking a UI/UX Designer to craft beautiful, intuitive, and modern interface layouts. You will carry out user research, design wireframes, build high-fidelity interactive prototypes, and establish our frontend design system guidelines. You will collaborate closely with product managers and engineers to build a cohesive product.

Requirements & Technical Competencies:
- 3+ years of professional experience as a UI/UX Designer with a strong portfolio.
- Mastery of Figma (components, autolayout, prototyping) or Adobe XD.
- Deep understanding of user research methodologies, personas, usability testing, and wireframing.
- Expertise in visual hierarchy, layout grid structures, typography, and color harmony.
- Strong knowledge of responsive design templates and Web Accessibility Guidelines (WCAG).`,

    "Product Manager": `Position: Product Manager (Agile Tech)
Company: SaaS Ventures
Location: Remote / Seattle, WA

Job Summary:
We are looking for a Product Manager to guide the lifecycle of our web applications. In this role, you will define the product vision, prioritize the development roadmap, gather customer feedback, and write specifications. You will coordinate with engineering and marketing teams to launch key user features.

Requirements & Technical Competencies:
- 3+ years of experience as a Product Manager in a software tech company.
- Strong experience leading Agile teams, organizing sprints, and writing product requirements (PRDs).
- In-depth knowledge of roadmap tools (Productboard, Roadmunk) and project systems (Jira).
- Strong data skills: experience using analytics packages (Mixpanel, Amplitude, Google Analytics).
- Excellent leadership, project management, and verbal presentation skills.`,

    "Project Manager": `Position: IT Project Manager
Company: Delivery Partners
Location: Remote

Job Summary:
We are seeking a Project Manager to plan resources, schedule development sprints, track task dependencies, and manage software delivery timelines. You will coordinate standups, monitor resource utilization, mitigate project risks, and report budget/milestone states to executive sponsors.

Requirements & Technical Competencies:
- 4+ years of IT Project Management experience.
- Project Management certification: PMP or Certified Scrum Master (CSM).
- Expert capability in scheduling, tracking dependencies, and resource mapping using MS Project, Asana, or Jira.
- Solid understanding of software development models (Agile Scrum, Kanban, Waterfall).
- Exceptional organizational, risk mitigation, and stakeholder management skills.`,

    "Technical Support Engineer": `Position: Tier 2 Technical Support Engineer
Company: HostGlobal Support
Location: Remote

Job Summary:
We are looking for a Technical Support Engineer to resolve advanced client issues, troubleshoot software glitches, and compile documentation. You will analyze server logs, run database queries to patch data issues, collaborate with core developers, and assist customers with advanced configurations.

Requirements & Technical Competencies:
- 2+ years of technical customer support or system administration experience.
- Strong troubleshooting capabilities with databases (SQL) and server logs.
- Experience with web protocols (HTTP, REST APIs) and shell command lines.
- Experience utilizing customer ticketing databases (Zendesk, Jira Service Desk).
- Strong empathy, clear communication, and excellent technical writing skills.`,

    "System Administrator": `Position: Linux System Administrator
Company: SysOps Services
Location: Remote / Denver, CO

Job Summary:
We are seeking a System Administrator to configure, monitor, and support our server infrastructure. You will manage user accounts, apply system patches, automate configuration states, configure automated backups, and troubleshoot server performance issues. The role focuses on ensuring server uptime and platform stability.

Requirements & Technical Competencies:
- 3+ years of Linux (RHEL, Ubuntu Server) or Windows Server administration.
- Proficient scripting skills in Bash, Python, or PowerShell.
- Practical experience with virtualization platforms (VMware, KVM) and network setups (DNS, DHCP, LDAP).
- Familiarity with configuration management tools (Ansible, Puppet, or Chef).
- Experience setting up backups, RAID storage, and server performance monitors (Nagios, Zabbix).`
};

// Export to window object for global client access
if (typeof window !== 'undefined') {
    window.JOBS_DATA = JOBS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JOBS_DATA };
}
