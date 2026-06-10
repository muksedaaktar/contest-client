import { useEffect, useState } from "react";

/* ---------------- CARD ---------------- */
const ContestCard = ({ contest }) => {
    return (
        <div className="bg-base-100 shadow-md rounded-xl p-4 hover:shadow-xl transition border border-base-300">
            <img
                src={contest.image}
                className="h-32 w-full object-cover rounded-lg"
                alt=""
            />

            <h2 className="font-bold mt-2 text-primary">{contest.name}</h2>

            <p className="text-sm text-base-content/70">
                {contest.short_description}
            </p>

            <div className="flex justify-between mt-3 text-sm font-medium">
                <span className="text-secondary">💰 ${contest.price}</span>
                <span className="text-accent">👥 {contest.participants || 0}</span>
            </div>
        </div>
    );
};

/* ---------------- SECTION ---------------- */
const Section = ({ title, icon, desc, data, colorClass }) => {
    return (
        <div className="mb-12">

            <h2 className={`text-2xl font-bold mb-1 flex items-center gap-2 ${colorClass}`}>
                {icon} {title}
            </h2>

            <p className="text-sm text-base-content/60 mb-4">
                {desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((c, i) => (
                    <ContestCard key={i} contest={c} />
                ))}
            </div>
        </div>
    );
};

/* ---------------- SKELETON CARD ---------------- */
const SkeletonCard = () => {
    return (
        <div className="animate-pulse bg-base-100 border border-base-300 p-4 rounded-xl space-y-3">
            <div className="h-32 bg-base-300 rounded-lg"></div>
            <div className="h-4 bg-base-300 w-3/4 rounded"></div>
            <div className="h-3 bg-base-300 w-1/2 rounded"></div>
            <div className="flex justify-between">
                <div className="h-3 w-10 bg-base-300 rounded"></div>
                <div className="h-3 w-10 bg-base-300 rounded"></div>
            </div>
        </div>
    );
};

/* ---------------- MAIN PAGE ---------------- */
const Explore = () => {

    const [contests, setContests] = useState([]);
    const [stage, setStage] = useState("loading"); 
    // loading → skeleton → ready

    useEffect(() => {

        // STEP 1: Spinner 5 sec
        // setStage("loading");

        const timer1 = setTimeout(() => {

            // fetch data
            fetch("https://contest-server-lyart.vercel.app/contests")
                .then(res => res.json())
                .then(data => {
                    setContests(data || []);

                    // STEP 2: skeleton 5 sec
                    setStage("skeleton");

                    setTimeout(() => {
                        setStage("ready");
                    }, 5000);
                });

        }, 5000);

        return () => clearTimeout(timer1);

    }, []);

    /* ---------------- FILTERS ---------------- */
    const newContests = [...contests]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    const trendingContests = [...contests]
        .sort((a, b) => (b.participants || 0) - (a.participants || 0))
        .slice(0, 6);

    const lowFeeContests = [...contests]
        .filter(c => c.price <= 100)
        .slice(0, 6);

    const recommendedContests = [...contests]
        .filter(c =>
            c.type === "design" ||
            c.type === "gaming" ||
            c.type === "coding"
        )
        .slice(0, 6);

    /* ---------------- UI: SPINNER ---------------- */
    if (stage === "loading") {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    /* ---------------- UI: SKELETON ---------------- */
    if (stage === "skeleton") {
        return (
            <div className="max-w-6xl mx-auto p-6">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-primary">
                        Explore Contests
                    </h1>
                </div>

                {[1,2,3,4].map(i => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ))}

            </div>
        );
    }

    /* ---------------- UI: READY ---------------- */
    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold ">
                    Explore <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">Contests</span>
                </h1>
                <p className="text-base-content/60 mt-2">
                    Discover, compete and win amazing rewards
                </p>
            </div>

            {/* RECOMMENDED */}
            <Section
                title="Recommended Contests"
                
                colorClass="text-primary"
                desc="These contests are recommended based on your activity, popular categories, and high winning probability. They match your interests like design, coding, and gaming to help you compete smarter and increase your chances of winning."
                data={recommendedContests}
            />

            {/* TRENDING */}
            <Section
                title="Trending Contests"
               
                colorClass="text-secondary"
                desc="These contests are currently trending because they have high participation, active submissions, and growing popularity among users. Join now to compete with active players and stay ahead in the competition."
                data={trendingContests}
            />

            {/* NEW */}
            <Section
                title="New Contests"
                
                colorClass="text-primary"
                desc="These are recently added contests on the platform. Being early gives you a better chance to stand out, face less competition, and improve your winning opportunity before they become popular."
                data={newContests}
            />

            {/* LOW ENTRY */}
            <Section
                title="Low Entry Fee Contests"
               
                colorClass="text-success"
                desc="These contests are suggested for users who want to participate with minimal cost. They are budget-friendly but still offer great winning opportunities, making them perfect for beginners and casual competitors."
                data={lowFeeContests}
            />

        </div>
    );
};

export default Explore;