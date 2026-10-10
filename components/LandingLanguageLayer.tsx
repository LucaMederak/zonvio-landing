"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useLandingLocale } from "@/lib/landingLocale";

const english: Record<string, string> = {
  "Produkt lub usługa": "Product or service",
  "Sprzedawaj produkty, usługi i subskrypcje w jednym miejscu":
    "Sell products, services and subscriptions in one place",
  "Sprzedaż całego ekosystemu": "Sales across the entire ecosystem",
  "Zarządzaj produktami, zamówieniami, subskrypcjami, płatnościami i sprzedażą całego ekosystemu.":
    "Manage products, orders, subscriptions, payments and sales across your entire ecosystem.",
  "Platforma infrastruktury biznesowej": "Business infrastructure platform",
  "Twoja wizja.": "Your vision.",
  "Twój biznes.": "Your business.",
  "Zbuduj swoją platformę": "Build your platform",
  "Zobacz, jak to działa": "See how it works",
  "Własna marka": "Your own brand",
  "Aplikacja i platforma": "App and platform",
  "Moduły, gdy ich potrzebujesz": "Modules when you need them",
  Aplikacja: "App",
  Platforma: "Platform",
  Sklep: "Store",
  Strona: "Website",
  Moduły: "Modules",
  "Agent AI": "AI Agent",
  "Wkrótce dostępne": "Coming soon",
  "Polecane moduły": "Recommended modules",
  "Zonvio dla Twojej branży": "Zonvio for your industry",
  "Jeden ekosystem. Wiele sposobów wykorzystania.":
    "One ecosystem. Many ways to use it.",
  "Zobacz ofertę dla tej branży": "See the solution for this industry",
  "Przykładowy ekosystem": "Example ecosystem",
  "Strona, aplikacja i panel działające pod Twoją marką":
    "A website, app and dashboard under your brand",
  "Agencja marketingowa": "Marketing agency",
  "Zarządzaj klientami, kampaniami i raportami w jednym systemie":
    "Manage customers, campaigns and reports in one system",
  "Połącz proces sprzedaży, onboarding, realizację kampanii i raportowanie. Klient widzi postępy w swoim panelu, a zespół pracuje według ustalonego workflow.":
    "Connect sales, onboarding, campaign delivery and reporting. Customers see progress in their portal while your team follows a defined workflow.",
  "Leady, oferty i onboarding nowych klientów":
    "Leads, proposals and new customer onboarding",
  "Kampanie, zadania oraz cykliczne raporty":
    "Campaigns, tasks and recurring reports",
  "Agent AI analizujący wyniki i przygotowujący podsumowania":
    "An AI agent that analyzes results and prepares summaries",
  Projekty: "Projects",
  Raporty: "Reports",
  "Agencja kreatywna": "Creative agency",
  "Prowadź projekty kreatywne od briefu do finalnej akceptacji":
    "Manage creative projects from brief to final approval",
  "Zbieraj briefy, prezentuj koncepcje i prowadź akceptacje w strefie klienta. Uporządkuj pliki, feedback, terminy i pracę całego zespołu.":
    "Collect briefs, present concepts and manage approvals in the customer portal. Organize files, feedback, deadlines and your entire team's work.",
  "Briefy i automatyczne tworzenie projektu":
    "Briefs and automatic project creation",
  "Prezentacja koncepcji oraz akceptacje klienta":
    "Concept presentations and customer approvals",
  "Wersjonowanie plików, komentarze i przekazanie materiałów":
    "File versioning, comments and final asset delivery",
  Pliki: "Files",
  Trener: "Trainer",
  "Prowadź podopiecznych i sprzedawaj plany pod własną marką":
    "Coach clients and sell plans under your own brand",
  "Połącz aplikację dla podopiecznych, plany treningowe, pomiary progresu, płatności i kontakt z trenerem w jeden spójny system.":
    "Bring together a client app, training plans, progress tracking, payments and communication with the trainer in one connected system.",
  "Plany treningowe i monitoring progresu":
    "Training plans and progress tracking",
  "Pakiety, subskrypcje i płatności": "Packages, subscriptions and payments",
  "Agent AI analizujący aktywność podopiecznych":
    "An AI agent that analyzes client activity",
  Płatności: "Payments",
  Dietetyk: "Dietitian",
  "Zbuduj cyfrowy gabinet i opiekę dietetyczną online":
    "Build a digital practice and offer online nutrition coaching",
  "Zbieraj ankiety, udostępniaj jadłospisy i materiały, umawiaj konsultacje oraz automatyzuj opiekę między wizytami.":
    "Collect questionnaires, share meal plans and resources, schedule consultations and automate support between appointments.",
  "Panel klienta z zaleceniami i materiałami":
    "Customer portal with recommendations and resources",
  "Konsultacje, formularze i przypomnienia":
    "Consultations, forms and reminders",
  "Sprzedaż diet, e-booków i programów opieki":
    "Sales of meal plans, e-books and coaching programs",
  "Zamień społeczność w biznes niezależny od platform społecznościowych":
    "Turn your community into a business independent of social platforms",
  "Sprzedawaj dostęp do treści, kursów i społeczności premium we własnej aplikacji, sklepie i serwisie pod własną marką.":
    "Sell access to premium content, courses and communities through your own branded app, store and website.",
  "Treści premium i płatna społeczność": "Premium content and a paid community",
  "Kursy, webinary i produkty cyfrowe":
    "Courses, webinars and digital products",
  "Automatyczny onboarding nowych członków":
    "Automated onboarding for new members",
  Subskrypcje: "Subscriptions",
  "Twórca TikTok": "TikTok creator",
  "Monetyzuj zasięgi i buduj społeczność poza social mediami":
    "Monetize your reach and build a community beyond social media",
  "Kieruj odbiorców do własnego sklepu, aplikacji i strefy premium, w której sprzedajesz wiedzę, materiały oraz dostęp do społeczności.":
    "Direct your audience to your own store, app and premium space where you sell knowledge, resources and community access.",
  "Szybkie landing pages dla kampanii i premier":
    "Fast landing pages for campaigns and launches",
  "Materiały premium, kursy i subskrypcje":
    "Premium resources, courses and subscriptions",
  "Automatyczne nadawanie dostępu po zakupie":
    "Automatic access after purchase",
  Edukator: "Educator",
  "Ucz, organizuj zajęcia i skaluj swoją wiedzę":
    "Teach, organize classes and scale your knowledge",
  "Połącz rezerwacje lekcji, materiały, kursy i płatności. Ucz indywidualnie lub twórz ofertę dostępną dla setek klientów.":
    "Connect lesson bookings, resources, courses and payments. Teach individually or create an offer for hundreds of customers.",
  "Kalendarz zajęć i cykliczne płatności":
    "Class calendar and recurring payments",
  "Kursy, zadania i biblioteka materiałów":
    "Courses, assignments and a resource library",
  "Panel postępów każdego uczestnika":
    "Individual progress dashboard for every participant",
  Materiały: "Resources",
  Grafik: "Designer",
  "Prezentuj portfolio, obsługuj zlecenia i sprzedawaj projekty":
    "Showcase your portfolio, manage commissions and sell designs",
  "Twoja strona, sklep i strefa klienta mogą działać razem — od pierwszego zapytania aż po przekazanie gotowych plików.":
    "Your website, store and customer portal can work together — from the first inquiry to final file delivery.",
  "Portfolio i formularz briefu": "Portfolio and brief form",
  "Akceptacja etapów oraz plików projektu":
    "Approval of project stages and files",
  "Sprzedaż szablonów, usług i licencji":
    "Sales of templates, services and licenses",
  Programista: "Developer",
  "Sprzedawaj oprogramowanie, wiedzę i dostęp w jednym miejscu":
    "Sell software, knowledge and access in one place",
  "Uruchom stronę produktu, płatności, licencje i panel użytkownika. Dodaj własne funkcje lub zintegruj Zonvio ze swoim API.":
    "Launch a product website, payments, licenses and a user portal. Add custom features or integrate Zonvio with your API.",
  "Sprzedaż aplikacji, licencji i subskrypcji":
    "Sales of apps, licenses and subscriptions",
  "Kursy, dokumentacja i płatny dostęp":
    "Courses, documentation and paid access",
  "Automatyczne procesy po zakupie produktu":
    "Automated processes after a product purchase",
  Licencje: "Licenses",
  Fotograf: "Photographer",
  "Połącz portfolio, rezerwacje i obsługę sesji":
    "Connect your portfolio, bookings and session management",
  "Klient może poznać ofertę, zarezerwować termin, opłacić sesję i odebrać materiały w jednej spójnej przestrzeni pod Twoją marką.":
    "Customers can explore your offer, book a date, pay for a session and receive their files in one branded space.",
  "Portfolio, pakiety i rezerwacja terminów":
    "Portfolio, packages and appointment booking",
  "Formularze przygotowujące klienta do sesji":
    "Forms that prepare customers for a session",
  "Bezpieczne galerie oraz przekazywanie plików":
    "Secure galleries and file delivery",
  Galerie: "Galleries",
  Księgowy: "Accountant",
  "Stwórz bezpieczną strefę współpracy z klientami":
    "Create a secure workspace for customer collaboration",
  "Uporządkuj dokumenty, zadania, terminy i komunikację. Każdy klient otrzymuje własny panel, a zespół pracuje według jednego procesu.":
    "Organize documents, tasks, deadlines and communication. Every customer gets their own portal while your team follows one consistent process.",
  "Panel klienta i bezpieczny obieg dokumentów":
    "Customer portal and secure document workflow",
  "Cykliczne zadania, terminy i przypomnienia":
    "Recurring tasks, deadlines and reminders",
  "Agent AI wspierający analizę i komunikację":
    "An AI agent supporting analysis and communication",
  Dokumenty: "Documents",
  Zadania: "Tasks",
  "Firma usługowa": "Service business",
  "Ułóż własny proces sprzedaży i obsługi klienta":
    "Build your own sales and customer service process",
  "Zbuduj system dopasowany do sposobu pracy Twojej firmy: od pozyskania leada, przez ofertę i płatność, po realizację usługi.":
    "Build a system tailored to how your company works: from lead acquisition through proposals and payments to service delivery.",
  "CRM, oferty i panel klienta": "CRM, proposals and customer portal",
  "Automatyczne zadania i komunikacja": "Automated tasks and communication",
  "Własne funkcje oraz agent AI dla zespołu":
    "Custom features and an AI agent for your team",
  "Zonvio w praktyce": "Zonvio in action",
  "Twoje centrum sprzedaży, obsługi i rozwoju marki":
    "Your hub for sales, customer service and brand growth",
  "Jedno doświadczenie dla Ciebie, zespołu i klientów.":
    "One connected experience for you, your team and your customers.",
  "Dodajesz tylko te obszary, których potrzebuje Twój biznes.":
    "Add only the areas your business needs.",
  "Agenci AI": "AI Agents",
  "Analizują dane i przygotowują kolejne działania.":
    "They analyze data and prepare the next actions.",
  "Automatyzujesz powtarzalne etapy obsługi i sprzedaży.":
    "Automate recurring customer service and sales processes.",
  "Zbuduj własny system": "Build your own system",
  "Poznaj możliwości": "Explore possibilities",
  "Demo platformy": "Platform demo",
  "Twoja przeglądarka nie obsługuje odtwarzania wideo.":
    "Your browser does not support video playback.",
  "Wszystko połączone": "Everything connected",
  "Pod Twoją własną marką": "Under your own brand",
  "Od pomysłu do uruchomienia": "From idea to launch",
  "Kiedyś własna aplikacja wymagała czasu i dużego budżetu":
    "A custom app used to require time and a large budget",
  Kiedyś: "Before",
  "Dziś z Zonvio": "Today with Zonvio",
  "Nie zaczynasz od pustej kartki. Wybierasz potrzebne moduły, funkcje i wygląd, a nasz zespół pomaga Ci sprawnie uruchomić cały ekosystem — od landing page’a i strony po platformę oraz aplikację gotową dla klientów.":
    "You do not start from a blank page. Choose the modules, features and design you need, and our team will help you efficiently launch the entire ecosystem — from a landing page and website to a platform and customer-ready app.",
  "Wiele miesięcy pracy": "Months of work",
  "Wysoki koszt wejścia": "High upfront cost",
  "Budowa wszystkiego od zera": "Building everything from scratch",
  "Platforma, strona i landing gotowe do uruchomienia":
    "A platform, website and landing page ready to launch",
  "Design dopasowany do Twojej marki": "Design tailored to your brand",
  "Wsparcie zespołu przy uruchomieniu": "Team support during launch",
  "Porozmawiajmy o Twojej aplikacji": "Let’s talk about your app",
  Współpraca: "Partnership",
  "Współpraca technologiczna": "Technology partnership",
  "Nova Studio współpracuje z Zonvio": "Nova Studio works with Zonvio",
  "aby aplikacja i panel klienta działały w jednym, spójnym ekosystemie technologicznym.":
    "so the app and customer portal work together in one connected technology ecosystem.",
  "Własny zielony motyw marki": "Custom green brand theme",
  "Domyślny motyw Zonvio": "Default Zonvio theme",
  "Połączenie aktywne": "Connection active",
  "nowe zamówienia": "new orders",
  "spotkań dzisiaj": "meetings today",
  "Wynik tego miesiąca": "This month’s result",
  "Pakiet Premium": "Premium package",
  "499 zł": "$499",
  "Program online": "Online program",
  "129 zł": "$129",
  "Nowe zamówienie": "New order",
  "Spotkanie dzisiaj": "Meeting today",
  "Aktywny program": "Active program",
  "● Aplikacja działa": "● App is live",
  "Gotowa dla klientów": "Ready for customers",
  "Rozwijaj biznes razem ze swoimi mediami społecznościowymi":
    "Grow your business together with your social media",
  "Marketing i sprzedaż w jednym miejscu": "Marketing and sales in one place",
  "Generuj treści z AI": "Generate content with AI",
  "Planuj i zarządzaj publikacją": "Plan and manage publishing",
  "Zamieniaj zasięg w sprzedaż": "Turn reach into sales",
  "Pomysły, scenariusze, opisy i okładki dopasowane do Twojej marki.":
    "Ideas, scripts, captions and covers tailored to your brand.",
  "Kalendarz treści, kampanie i zadania zespołu w jednym module.":
    "A content calendar, campaigns and team tasks in one module.",
  "Łącz każdą treść z produktem, landingiem, rezerwacją lub subskrypcją.":
    "Connect every piece of content to a product, landing page, booking or subscription.",
  "Od pierwszego pomysłu na rolkę do płatności klienta — w jednym ekosystemie.":
    "From the first reel idea to customer payment — in one ecosystem.",
  "Rozwijaj swoją markę": "Grow your brand",
  "Polecenie dla agenta marketingowego": "Marketing agent prompt",
  "Analiza profilu": "Profile analysis",
  "Generowanie rolek": "Reel generation",
  "3 błędy na starcie": "3 mistakes at the start",
  "Kulisy współpracy": "Behind the scenes",
  "Efekt po 30 dniach": "Results after 30 days",
  "Kalendarz publikacji": "Publishing calendar",
  Pn: "Mon",
  Wt: "Tue",
  Śr: "Wed",
  Cz: "Thu",
  Pt: "Fri",
  "Produkt z rolki": "Product featured in the reel",
  "Program Premium": "Premium program",
  "299 zł": "$299",
  "Płatność online": "Online payment",
  "Sprzedaż z Instagrama": "Sale from Instagram",
  "Marketing, treści i sprzedaż połączone przez Zonvio":
    "Marketing, content and sales connected by Zonvio",
  "Ty zarządzasz. Klient doświadcza Twojej marki.":
    "You manage. Your client experiences your brand.",
  "Jedna wspólna przestrzeń": "One connected workspace",
  Sprzedaż: "Sales",
  "Obsługa klienta": "Customer service",
  Komunikacja: "Communication",
  "Postępy i dane": "Progress and data",
  Synchronizacja: "Sync",
  "Nowe zamówienie — Program Premium": "New order — Premium Program",
  "Płatność 299 zł została potwierdzona. Dostęp może zostać nadany automatycznie.":
    "The $299 payment has been confirmed. Access can be granted automatically.",
  "Udostępniono produkt": "Product access granted",
  "Nowy dostęp": "New access",
  "Program Premium jest już dostępny": "Premium Program is now available",
  "Materiały i pierwszy etap czekają w Twojej aplikacji.":
    "The resources and first stage are waiting in your app.",
  "Nowy materiał dla Jana Nowaka": "New resource for Jan Nowak",
  "Zespół dodał plan działania i przypisał go do aktualnego etapu współpracy.":
    "The team added an action plan and assigned it to the current stage of the engagement.",
  "Udostępniono materiał": "Resource shared",
  "Twój plan": "Your plan",
  "Nowy materiał od opiekuna": "New resource from your account manager",
  "Otwórz plan działania i przejdź do pierwszego zadania.":
    "Open the action plan and proceed to the first task.",
  "Przypomnienie zaplanowane": "Reminder scheduled",
  "Wiadomość zostanie wysłana do klienta we właściwym momencie jego procesu.":
    "The message will be sent at the right point in the customer journey.",
  "Wysłano wiadomość": "Message sent",
  Wiadomość: "Message",
  "Twój opiekun przesłał aktualizację": "Your account manager sent an update",
  "Sprawdź szczegóły i potwierdź kolejny termin współpracy.":
    "Review the details and confirm the next appointment.",
  "Jan uzupełnił raport tygodniowy": "Jan completed the weekly report",
  "Wyniki zostały zapisane w profilu klienta i uwzględnione w analizie postępów.":
    "The results were saved to the customer profile and included in the progress analysis.",
  "Dane zsynchronizowane": "Data synchronized",
  "Raport zapisany": "Report saved",
  "Twój postęp: 82%": "Your progress: 82%",
  "Świetnie! Wyniki są już widoczne dla Twojego opiekuna.":
    "Great! Your results are now visible to your account manager.",
  "Panel biznesowy": "Business dashboard",
  "Panel klientów": "Customer dashboard",
  Aktywni: "Active",
  Nowi: "New",
  "Aplikacja klienta": "Customer app",
  "Dzień dobry, Jan": "Good morning, Jan",
  NOWE: "NEW",
  "Zobacz szczegóły": "View details",
  "Synchronizacja zakończona": "Synchronization complete",
  "Przed chwilą": "Just now",
  "Jedne dane dla całego biznesu": "One data source for your entire business",
  "Mniej wiadomości i ręcznej obsługi": "Fewer messages and less manual work",
  "Spójne doświadczenie pod Twoją marką":
    "A consistent experience under your brand",
  "Jeden fundament. Moduły dopasowane do Twojego biznesu.":
    "One foundation. Modules tailored to your business.",
  Ekosystem: "Ecosystem",
  "Już działa": "Available now",
  "Zobacz działający moduł": "See the live module",
  "Moduł dla trenerów": "Module for trainers",
  "Prowadzenie podopiecznych, pakietów, planów treningowych i rozliczania wykonanych treningów.":
    "Manage clients, packages, training plans and completed workout billing.",
  "Analiza profilu, pomysły i scenariusze rolek, kalendarz publikacji oraz połączenie treści ze sprzedażą.":
    "Profile analysis, reel ideas and scripts, a publishing calendar and a direct connection between content and sales.",
  "Kursy, lekcje, materiały premium, postępy uczestników i sprzedaż dostępu pod własną marką.":
    "Courses, lessons, premium resources, participant progress and access sales under your own brand.",
  "Briefy, etapy projektu, prezentacja koncepcji, akceptacje klienta i bezpieczne przekazywanie plików.":
    "Briefs, project stages, concept presentations, customer approvals and secure file delivery.",
  "Terminy i płatności": "Appointments and payments",
  "Rezerwacje wizyt, konsultacji, sesji online i usług z płatnością przed spotkaniem.":
    "Bookings for appointments, consultations, online sessions and services with payment before the meeting.",
  "infrastruktura biznesu": "business infrastructure",
  "Jedna baza dla sprzedaży online, płatności, produktów, klientów, zespołów, plików i integracji.":
    "One foundation for online sales, payments, products, customers, teams, files and integrations.",
  "Każdy moduł może korzystać z tego samego fundamentu Zonvio, ale odpowiada na inny sposób pracy: prowadzenie klientów, marketing, projekty kreatywne, kursy lub rezerwacje.":
    "Every module can use the same Zonvio foundation while supporting a different way of working: customer management, marketing, creative projects, courses or bookings.",
  "Plan dopasowany do etapu Twojego biznesu":
    "A plan tailored to your business stage",
  "Elastyczne plany": "Flexible plans",
  "Zonvio może rosnąć razem z Twoją marką. Zacznij od planu dopasowanego do obecnej skali, a wraz z rozwojem sprzedaży, zespołu i kolejnych modułów przejdź na wyższy wariant.":
    "Zonvio can grow with your brand. Start with a plan suited to your current scale, then upgrade as your sales, team and modules expand.",
  "Dla twórców, którzy zaczynają sprzedawać i chcą płacić jak najmniej na start.":
    "For creators who are starting to sell and want the lowest possible initial cost.",
  "Sprzedaż produktów cyfrowych": "Digital product sales",
  "Sklep, koszyk i płatności": "Store, cart and payments",
  "Newslettery i listy subskrybentów": "Newsletters and subscriber lists",
  "Prowizja 2,6% od transakcji": "2.6% transaction fee",
  "Dla twórców, którzy sprzedają regularnie i nie chcą oddawać prowizji od każdej transakcji.":
    "For creators who sell regularly and do not want to pay a fee on every transaction.",
  "Wszystko z planu Basic": "Everything in Basic",
  "Bez prowizji od transakcji": "No transaction fees",
  "Własny branding sklepu": "Custom store branding",
  "Subskrypcje i płatności cykliczne": "Subscriptions and recurring payments",
  "Dla twórców z największą sprzedażą, którym zależy na pełnym wsparciu.":
    "For high-volume creators who want comprehensive support.",
  "Wszystko z planu Pro": "Everything in Pro",
  "Priorytetowe wsparcie": "Priority support",
  "Pomoc przy konfiguracji sprzedaży": "Sales setup assistance",
  "Najchętniej wybierane": "Most popular",
  "W pakiecie:": "Included:",
  "1 miesiąc": "1 month",
  "3 miesiące": "3 months",
  "6 miesięcy": "6 months",
  "płatność miesięczna": "monthly billing",
  "225 zł za 3 miesiące": "PLN 225 for 3 months",
  "426 zł za 6 miesięcy": "PLN 426 for 6 months",
  "366 zł za 3 miesiące": "PLN 366 for 3 months",
  "696 zł za 6 miesięcy": "PLN 696 for 6 months",
  "81 zł za 3 miesiące": "PLN 81 for 3 months",
  "150 zł za 6 miesięcy": "PLN 150 for 6 months",
  od: "from",
  "zł /": "PLN /",
  "mies.": "mo.",
  "/ mies.": "/ mo.",
  zł: "PLN",
  Wybierz: "Choose",
  "Szczegóły planów znajdziesz w": "Plan details are available in the",
  cenniku: "pricing page",
  "Bezpieczne płatności z Stripe": "Secure payments with Stripe",
  Bezpieczeństwo: "Security",
  "Sprzedawaj produkty, usługi i subskrypcje bez budowania własnej infrastruktury płatniczej. Transakcje w Zonvio obsługuje Stripe, a dane kart nie są przechowywane bezpośrednio w Zonvio.":
    "Sell products, services and subscriptions without building your own payment infrastructure. Stripe processes Zonvio transactions, and card details are not stored directly by Zonvio.",
  "Twoje dane są bezpieczne": "Your data is secure",
  "Stripe przechowuje informacje o kartach i płatnościach zgodnie z najwyższymi standardami bezpieczeństwa (PCI DSS). Zonvio nie ma dostępu do pełnych danych kart płatniczych.":
    "Stripe stores card and payment information in accordance with the highest security standards (PCI DSS). Zonvio does not have access to full payment card details.",
  "Pełna ochrona transakcji": "Full transaction protection",
  "Każda transakcja jest szyfrowana i weryfikowana przez Stripe. Chronimy zarówno Twój biznes, jak i klientów przed nieautoryzowanymi płatnościami.":
    "Every transaction is encrypted and verified by Stripe, protecting both your business and customers from unauthorized payments.",
  "Proste zarządzanie zwrotami i subskrypcjami":
    "Simple refunds and subscription management",
  "Stripe automatycznie obsługuje zwroty i subskrypcje, co upraszcza proces sprzedaży i zmniejsza ryzyko błędów księgowych.":
    "Stripe automatically handles refunds and subscriptions, simplifying sales and reducing the risk of accounting errors.",
  "Integracje z popularnymi narzędziami": "Integrations with popular tools",
  Integracje: "Integrations",
  "Połącz narzędzia, których już używa Twój biznes. Zonvio synchronizuje marketing, płatności, faktury i dane klientów w jednym procesie.":
    "Connect the tools your business already uses. Zonvio synchronizes marketing, payments, invoices and customer data in one process.",
  "Wybieraj funkcje, których naprawdę potrzebujesz":
    "Choose the features you actually need",
  "Możliwości platformy": "Platform capabilities",
  "Pokaż wszystkie": "Show all",
  Dostępne: "Available",
  Wkrótce: "Coming soon",
  Planowane: "Planned",
  "Zonvio łączy gotowe funkcje sprzedaży i obsługi klientów z modułami rozwijanymi dla konkretnych branż. Zacznij od dostępnych elementów i dodawaj kolejne wraz z rozwojem biznesu.":
    "Zonvio combines ready-made sales and customer service features with modules developed for specific industries. Start with what is available and add more as your business grows.",
  "Możliwość zarządzania wieloma organizacjami":
    "Manage multiple organizations",
  "Zarządzaj wieloma organizacjami z jednego konta.":
    "Manage multiple organizations from one account.",
  "Pracuj w zespole, dodawaj członków organizacji":
    "Work as a team and add organization members",
  "Współpracuj nad treściami i sprzedażą.": "Collaborate on content and sales.",
  "Integracja ze Stripe": "Stripe integration",
  "Bezpieczne płatności i subskrypcje.": "Secure payments and subscriptions.",
  "Integracje z systemami analitycznymi": "Analytics integrations",
  "Podłącz Google Analytics, Meta Pixel, Hotjar oraz inne narzędzia analityczne i marketingowe.":
    "Connect Google Analytics, Meta Pixel, Hotjar and other analytics and marketing tools.",
  "Integracje z systemami mailingowymi": "Email marketing integrations",
  "Połącz MailerLite, GetResponse oraz ActiveCampaign.":
    "Connect MailerLite, GetResponse and ActiveCampaign.",
  "Integracje z systemami do fakturowania": "Invoicing integrations",
  "Automatyczne faktury i rozliczenia.": "Automatic invoices and settlements.",
  "Produkty cyfrowe, subskrypcje, warianty, płatne newslettery":
    "Digital products, subscriptions, variants and paid newsletters",
  "Sprzedawaj ebooki, kursy i produkty cyfrowe.":
    "Sell e-books, courses and digital products.",
  "Możliwość dodania strony ze sklepem (profil publiczny)":
    "Add a storefront page (public profile)",
  "Publiczna strona Twojej oferty.": "A public page for your offer.",
  "Elastyczne płatności (prowizja, abonament)":
    "Flexible payments (commission or subscription)",
  "Różne modele monetyzacji.": "Multiple monetization models.",
  "Manager plików": "File manager",
  "Zarządzaj plikami i materiałami.": "Manage files and resources.",
  "Klienci zarządzają subskrypcjami i zakupami.":
    "Customers manage their subscriptions and purchases.",
  "Chronione treści po zakupie": "Protected content after purchase",
  "Bezpieczne pobieranie plików na chronionej stronie po zakupie.":
    "Secure file downloads from a protected page after purchase.",
  "Możliwość dodania szybkiego linku do płatności":
    "Create a quick payment link",
  "Generuj szybkie linki sprzedażowe.": "Generate quick sales links.",
  "Kody rabatowe": "Discount codes",
  "Twórz promocje.": "Create promotions.",
  "Sklep w własnej domenie": "Store on your own domain",
  "Uruchom sklep na własnym adresie.": "Launch a store at your own address.",
  "Szybkie tworzenie sklepu AI": "Fast AI store creation",
  "Automatyczne generowanie sklepu.": "Automatic store generation.",
  "Integracje marketingowe": "Marketing integrations",
  "Połącz narzędzia marketingowe.": "Connect marketing tools.",
  "Landing page sprzedażowy": "Sales landing page",
  "Twórz strony sprzedażowe produktów.": "Create product sales pages.",
  "Kalendarz spotkań": "Meeting calendar",
  "Rezerwacje i spotkania online.": "Bookings and online meetings.",
  "Platforma z kursami": "Course platform",
  "Twórz i sprzedawaj kursy online.": "Create and sell online courses.",
  "Integracja z dodatkowymi bramkami płatności":
    "Additional payment gateway integrations",
  "Obsługa dodatkowych bramek płatności i lokalnych metod płatności.":
    "Support for additional payment gateways and local payment methods.",
  "Analiza profilu, generowanie rolek, kalendarz publikacji i łączenie treści ze sprzedażą.":
    "Profile analysis, reel generation, a publishing calendar and content-to-sales connections.",
  "Briefy, etapy projektów, akceptacje klienta, komentarze oraz przekazywanie finalnych plików.":
    "Briefs, project stages, customer approvals, comments and final file delivery.",
  "Kursy, lekcje, materiały premium i monitorowanie postępów uczestników.":
    "Courses, lessons, premium resources and participant progress tracking.",
  "Rezerwacje wizyt i konsultacji z płatnością oraz automatycznymi przypomnieniami.":
    "Appointment and consultation bookings with payments and automatic reminders.",
  "Aplikacja mobilna pod własną marką": "A mobile app under your own brand",
  "Aplikacja dla klientów z własnym logo, kolorami i dopasowanymi modułami.":
    "A customer app with your logo, colors and tailored modules.",
  "Analiza danych, przygotowywanie treści i wspieranie codziennej obsługi klientów.":
    "Data analysis, content preparation and support for daily customer service.",
  "Własne funkcje generowane na podstawie polecenia":
    "Custom features generated from a prompt",
  "Tworzenie dopasowanych funkcji i ekranów charakterystycznych dla Twojego biznesu.":
    "Create tailored features and screens specific to your business.",
  "Automatyczne workflow": "Automated workflows",
  "Łączenie zdarzeń, warunków i działań w procesy obsługi oraz sprzedaży.":
    "Connect events, conditions and actions into customer service and sales processes.",
  "Najczęściej zadawane pytania": "Frequently asked questions",
  "Wybierz branżę i zobacz, jak aplikacja, platforma oraz moduły Zonvio mogą wspierać Twój model pracy i sprzedaży.":
    "Choose your industry and see how the Zonvio app, platform and modules can support the way you work and sell.",
  "Zarządzaj ofertą, klientami, płatnościami i codzienną pracą z jednego miejsca. Zonvio porządkuje cały proces i daje Ci przestrzeń, którą możesz rozwijać razem ze swoim biznesem.":
    "Manage your offer, customers, payments and daily work in one place. Zonvio organizes the process and gives you a workspace that grows with your business.",
  "Od razu możesz uruchomić platformę, stronę i landing page. W kilka dni Twoja marka może być obecna wszędzie.":
    "Launch a platform, website and landing page right away. In just a few days, your brand can be present everywhere.",
  "Planuj i generuj rolki, zarządzaj publikacjami, a zainteresowanie odbiorców kieruj prosto do swojej oferty. Zonvio łączy marketing, sklep i obsługę klientów w jednym procesie.":
    "Plan and generate reels, manage publishing and direct audience interest straight to your offer. Zonvio connects marketing, commerce and customer service in one process.",
  "Prowadź sprzedaż, klientów i pracę zespołu w panelu biznesowym. Każda zmiana trafia do aplikacji klienta automatycznie — bez przepisywania danych i ręcznego wysyłania materiałów.":
    "Manage sales, customers and team operations in the business panel. Every change reaches the customer app automatically.",
  "Zonvio łączy dane, sprzedaż, klientów i procesy. Do wspólnej infrastruktury dobierasz wyspecjalizowane moduły, które odpowiadają sposobowi pracy Twojej branży.":
    "Zonvio connects data, sales, customers and processes. Add specialized modules that match the way your industry works.",
  "Jak uruchomić platformę pod swoim brandem?":
    "How do I launch a platform under my own brand?",
  "Wybierasz potrzebne moduły, uzupełniasz dane swojej marki — nazwę, logo, kolory i domenę — a następnie konfigurujesz ofertę oraz dostęp dla klientów. Możesz zacząć od podstawowej wersji i dodawać kolejne funkcje wraz z rozwojem biznesu.":
    "Choose the modules you need, add your brand details — name, logo, colors and domain — then configure your offer and customer access. You can start with a basic version and add more features as your business grows.",
  "Jak uruchomić aplikację pod własną marką?":
    "How do I launch an app under my own brand?",
  "Uzupełniasz formularz dotyczący Twojej marki, klientów, potrzebnych modułów i sposobu działania aplikacji. Następnie nasz zespół pomaga Ci krok po kroku przygotować, skonfigurować i uruchomić aplikację opartą na architekturze Zonvio.":
    "Complete a form about your brand, customers, required modules and how the app should work. Our team then helps you prepare, configure and launch an app based on the Zonvio architecture, step by step.",
  "Jak działają płatności?": "How do payments work?",
  "Podłączasz swoje konto Stripe i od razu możesz przyjmować płatności od klientów. Obsługujemy karty płatnicze oraz inne popularne metody płatności.":
    "Connect your Stripe account and start accepting customer payments immediately. We support payment cards and other popular payment methods.",
  "Czy mogę zarządzać klientami i zespołem w jednym miejscu?":
    "Can I manage customers and my team in one place?",
  "Tak. Panel biznesowy łączy klientów, sprzedaż, zadania, pliki i komunikację. Klienci korzystają z własnego panelu lub aplikacji, a dane synchronizują się automatycznie.":
    "Yes. The business dashboard connects customers, sales, tasks, files and communication. Customers use their own portal or app, and data synchronizes automatically.",
  "Czy Agent AI i własne funkcje są już dostępne?":
    "Are AI Agents and custom features available yet?",
  "Te możliwości są obecnie rozwijane i zostały oznaczone jako „Wkrótce dostępne”. Pokazane na stronie animacje prezentują planowany sposób ich działania.":
    "These capabilities are currently in development and marked as “Coming soon.” The animations on this page demonstrate how they are planned to work.",
  "Jak szybko można uruchomić pierwszą wersję?":
    "How quickly can the first version be launched?",
  "Prostą stronę, landing, sprzedaż i panel można uruchomić bardzo szybko. Dokładny czas zależy od wybranych modułów, brandingu, integracji i zakresu indywidualnych funkcji.":
    "A simple website, landing page, sales setup and dashboard can be launched very quickly. The exact timeline depends on the selected modules, branding, integrations and scope of custom features.",
  "Trening i prowadzenie online": "Training and online coaching",
  "Marketing i social media": "Marketing and social media",
  "Projekty i agencje kreatywne": "Projects and creative agencies",
  "Kursy i wiedza": "Courses and knowledge",
  "Wizyty i rezerwacje": "Appointments and bookings",
  "Prowadź klientów i rozwijaj biznes fitness":
    "Coach clients and grow your fitness business",
  "Twórz treści, rozwijaj zasięg i zamieniaj go w sprzedaż":
    "Create content, grow your reach and turn it into sales",
  "Prowadź projekty od briefu do finalnej akceptacji":
    "Manage projects from brief to final approval",
  "Sprzedawaj wiedzę i buduj własną akademię":
    "Sell your knowledge and build your own academy",
  "Przyjmuj rezerwacje bez zbędnych wiadomości":
    "Accept bookings without unnecessary messages",
  "Plan treningowy": "Training plan",
  "Plan publikacji": "Publishing plan",
  "Akceptacja projektu": "Project approval",
  "Nowa lekcja": "New lesson",
  "Najbliższa wizyta": "Next appointment",
  "Prowadzenie online": "Online coaching",
  "Kampania Social Media": "Social media campaign",
  "Pakiet Kreatywny": "Creative package",
  "Kurs Premium": "Premium course",
  "Konsultacja 1:1": "1:1 consultation",
  "Workflow nowego klienta": "New customer workflow",
  "Uruchomiony automatycznie": "Started automatically",
  "W toku": "In progress",
  "Brak aktywności": "No activity",
  "Dzień dobry, Anna": "Good morning, Anna",
  "Nowy materiał": "New material",
  "Moduł 4 · 12 min": "Module 4 · 12 min",
  Konsultacja: "Consultation",
  "Jutro, 10:00": "Tomorrow, 10:00 AM",
  "Twój progres": "Your progress",
  "+18% w tym tyg.": "+18% this week",
  "Logo, kolory i funkcje": "Logo, colors and features",
  Pulpit: "Dashboard",
  Klienci: "Customers",
  Kalendarz: "Calendar",
  "Dzień dobry!": "Good morning!",
  "Twój biznes w jednym miejscu": "Your business in one place",
  "aktywnych klientów": "active customers",
  sprzedaży: "in sales",
  "zadań na dziś": "tasks for today",
  "Ostatnia aktywność": "Recent activity",
  "Zobacz wszystko": "View all",
  "Nowy klient dołączył": "A new customer joined",
  "Opłacono subskrypcję": "Subscription paid",
  "Formularz został uzupełniony": "Form completed",
  "panel.twojamarka.pl": "panel.yourbrand.com",
  "8 420 zł": "$8,420",
  "249 zł": "$249",
  "399 zł": "$399",
  "89 zł": "$89",
  "Sklep Twojej Marki": "Your Brand Store",
  Koszyk: "Cart",
  "Jednorazowo, w pakietach lub subskrypcji":
    "One-time, in packages or by subscription",
  "Pakiet materiałów": "Materials package",
  "BLIK, karty i szybkie przelewy": "Cards and fast online payments",
  "twojamarka.pl": "yourbrand.com",
  "O mnie": "About",
  "TWOJA WŁASNA STRONA": "YOUR OWN WEBSITE",
  "Profesjonalna oferta, płatności i panel klienta — wszystko pod Twoją marką.":
    "A professional offer, payments and customer portal — all under your brand.",
  "Sprawdź ofertę": "View offer",
  "Polecenie dla agenta": "Agent prompt",
  "Agent relacji": "Relationship agent",
  "Agent relacji z klientami": "Customer relationship agent",
  Gotowe: "Ready",
  "Analiza dotyczy modułu": "The analysis uses the module",
  "Przeanalizuj mój Instagram i utwórz okładki oraz opisy produktów do sklepu.":
    "Analyze my Instagram and create product covers and descriptions for my store.",
  "Pokaż klientów, którym kończy się pakiet, i zaproponuj ofertę przedłużenia.":
    "Show customers whose packages are ending and suggest a renewal offer.",
  "Wybierz osoby bez kolejnej rezerwacji i przygotuj wiadomość przypominającą.":
    "Find people without another booking and prepare a reminder message.",
  "posty przeanalizowane": "posts analyzed",
  "produkty utworzone": "products created",
  "klientów przeanalizowanych": "customers analyzed",
  "ofert do wysłania": "offers ready to send",
  "wiadomości gotowych": "messages ready",
  "Zobacz produkty": "View products",
  "Utwórz ofertę": "Create offer",
  "Wyślij przypomnienie": "Send reminder",
  "Przeanalizowałem styl profilu i przygotowałem spójne propozycje produktów.":
    "I analyzed the profile style and prepared a consistent set of product ideas.",
  "Wybrałem klientów z pakietem kończącym się w ciągu 14 dni.":
    "I selected customers whose packages expire within 14 days.",
  "Znalazłem osoby bez kolejnego terminu i przygotowałem przypomnienie.":
    "I found people without another booking and prepared a reminder.",
  "Opisz własną funkcję": "Describe your custom feature",
  "Bez kodowania": "No coding",
  "Generowanie funkcji": "Generating feature",
  "Własna funkcja": "Custom feature",
  "Po zakupie pokaż klientowi animowane podziękowanie i od razu udostępnij materiały.":
    "After purchase, show an animated thank-you and grant access to the materials immediately.",
  "Po ukończeniu kursu wygeneruj certyfikat i pokaż klientowi gratulacje.":
    "After course completion, generate a certificate and congratulate the customer.",
  "Gdy klient osiągnie cel, pokaż jego wynik i odblokuj specjalną nagrodę.":
    "When a customer reaches a goal, show the result and unlock a special reward.",
  "Dziękujemy, Anno!": "Thank you, Anna!",
  "Zakup potwierdzony. Materiały już na Ciebie czekają.":
    "Purchase confirmed. Your materials are ready.",
  "Kurs ukończony!": "Course completed!",
  "Gratulacje! Twój certyfikat jest gotowy do pobrania.":
    "Congratulations! Your certificate is ready to download.",
  "Cel osiągnięty!": "Goal achieved!",
  "Świetna robota! Odblokowaliśmy dla Ciebie specjalną nagrodę.":
    "Great job! We unlocked a special reward for you.",
  "Automatyczny workflow": "Automated workflow",
  "Po zakupie nadaj dostęp, wyślij onboarding i utwórz zadanie dla opiekuna.":
    "After purchase, grant access, send onboarding and create a task for the account manager.",
  "Gdy klient nie jest aktywny przez 14 dni, wyślij przypomnienie i zaplanuj kontakt.":
    "When a customer is inactive for 14 days, send a reminder and schedule follow-up.",
  "Po ukończeniu programu wygeneruj raport, certyfikat i ofertę kolejnego etapu.":
    "After program completion, generate a report, certificate and next-stage offer.",
  Zakup: "Purchase",
  Dostęp: "Access",
  Zadanie: "Task",
  Analiza: "Analysis",
  Kontakt: "Follow-up",
  Ukończenie: "Completion",
  Raport: "Report",
  Certyfikat: "Certificate",
  Oferta: "Offer",
  "Zacznij od jednego modułu i dodawaj kolejne, kiedy Twoja firma będzie gotowa.":
    "Start with one module and add more whenever your business is ready.",
  "Sprzedaż i płatności": "Sales and payments",
  Rezerwacje: "Bookings",
  "Kursy i materiały": "Courses and materials",
  "Panel klienta": "Customer portal",
  "CRM i relacje": "CRM and relationships",
  "Zadania i projekty": "Tasks and projects",
  Formularze: "Forms",
  Analityka: "Analytics",
  "Analizuje aktywność klientów, wskazuje ryzyka i przygotowuje działania do zatwierdzenia.":
    "Analyzes customer activity, identifies risks and prepares actions for approval.",
  "Znajdź nieaktywnych klientów": "Find inactive customers",
  "Podsumuj ich historię": "Summarize their history",
  "Przygotuj wiadomość": "Prepare a message",
  "Utwórz zadanie dla opiekuna": "Create a task for the account manager",
  "Dodaj dane, ekrany i działania charakterystyczne dla Twojej branży — bez zmiany całej platformy.":
    "Add data, screens and actions specific to your industry — without rebuilding the entire platform.",
  "Własne pola klienta": "Custom customer fields",
  "Dedykowane formularze": "Dedicated forms",
  "Role i uprawnienia": "Roles and permissions",
  "Raporty branżowe": "Industry reports",
  "Integracje z API": "API integrations",
  "Akcje zespołu": "Team actions",
  "Połącz zdarzenia, warunki i akcje w proces, który działa dokładnie tak jak Twoja firma.":
    "Connect events, conditions and actions into a process that works exactly like your business.",
  "Opisz swój workflow": "Describe your workflow",
  Automatyzacja: "Automation",
  "Moduły Zonvio": "Zonvio modules",
  "Wybierz tylko to, czego potrzebuje Twój biznes":
    "Choose only what your business needs",
  "Przykładowy agent AI": "Example AI agent",
  "Agent opiekuna klientów": "Customer success agent",
  "Własne funkcje": "Custom features",
  "System dopasowany do Twojego sposobu pracy":
    "A system tailored to the way you work",
  "Od zakupu do obsługi klienta": "From purchase to customer service",
  "Twoja aplikacja": "Your app",
  "Twój panel": "Your dashboard",
  "Sprzedawaj po swojemu": "Sell on your terms",
  "Produkty i usługi": "Products and services",
  "Płatność gotowa": "Payment ready",
  "Płatności online": "Online payments",
  "Własna domena": "Custom domain",
  "Gotowe sekcje": "Ready-made sections",
  "Gotowe pod Twoją marką": "Ready for your brand",
  "Uruchamiaj i rozwijaj bez kodowania": "Launch and grow without coding",
  "Zbuduj profesjonalną obecność, która wzmacnia wiarygodność Twojej marki i pomaga sprzedawać więcej. Wybieraj moduły, funkcje, workflowy i AI, a Zonvio połączy je w aplikację, platformę, stronę lub sklep działający pod Twoją marką.":
    "Build a professional presence that strengthens your brand credibility and helps you sell more. Choose modules, features, workflows and AI, and Zonvio will connect them into an app, platform, website or store under your brand.",
  "Strona oferty i landing pages": "Offer website and landing pages",
  "Formularze, pliki i szybkie linki do płatności":
    "Forms, files and quick payment links",
  "Socials, Creative, Courses i Booking by Zonvio":
    "Socials, Creative, Courses and Booking by Zonvio",
  "Rozszerzone integracje marketingowe i analityczne":
    "Advanced marketing and analytics integrations",
  "Agenci AI i własne funkcje (wkrótce)":
    "AI Agents and custom features (coming soon)",
  "Zaawansowane role, dane i procesy zespołu":
    "Advanced team roles, data and processes",
  "Pomoc przy wdrożeniu własnej aplikacji mobilnej":
    "Support with launching your own mobile app",
  "Dla marek, które chcą uruchomić sprzedaż i podstawową przestrzeń dla klientów.":
    "For brands ready to launch sales and a core customer space.",
  "Platforma, sklep i płatności": "Platform, store and payments",
  "Produkty, usługi i dostęp dla klientów":
    "Products, services and customer access",
  "Panel klienta i podstawowe integracje":
    "Customer portal and core integrations",
  "Dla rozwijających się biznesów, które potrzebują własnego brandingu i sprzedaży bez prowizji.":
    "For growing businesses that need custom branding and commission-free sales.",
  "Własny branding i domena": "Custom branding and domain",
  "Subskrypcje, workflow i dodatkowe moduły":
    "Subscriptions, workflows and additional modules",
  "Dla firm i zespołów, które rozwijają większy ekosystem klientów, danych i procesów.":
    "For companies and teams building a larger ecosystem of customers, data and processes.",
  "Rozszerzone moduły i automatyzacje": "Advanced modules and automations",
  "Pomoc przy konfiguracji platformy": "Platform setup assistance",
};

export default function LandingLanguageLayer({
  children,
}: {
  children: ReactNode;
}) {
  const locale = useLandingLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locale !== "en" || !rootRef.current) return;
    const root = rootRef.current;
    const translate = (target: Node) => {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const value = node.nodeValue ?? "";
        const key = value.trim();
        if (english[key]) node.nodeValue = value.replace(key, english[key]);
      }
    };
    translate(root);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "characterData")
          translate(record.target.parentNode ?? record.target);
        record.addedNodes.forEach(translate);
      });
    });
    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [locale]);

  return <div ref={rootRef}>{children}</div>;
}
