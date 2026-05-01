"""
Static election data: timeline phases, flowchart nodes/edges, and simulation decision trees.
Based on Election Commission of India processes.
"""

TIMELINE_PHASES = [
    {
        "id": "announcement",
        "step": "Announcement",
        "icon": "📢",
        "day": 0,
        "duration": "Day 0",
        "color": "#6366f1",
        "description": "The Election Commission of India officially announces the election schedule, including dates for nominations, polling, and counting.",
        "key_activities": [
            "Model Code of Conduct comes into effect",
            "Election dates announced for all phases",
            "Transfer of officials begins",
            "ECI sets up monitoring teams"
        ]
    },
    {
        "id": "nomination",
        "step": "Nomination Filing",
        "icon": "📝",
        "day": 3,
        "duration": "Day 3-7",
        "color": "#8b5cf6",
        "description": "Candidates file their nomination papers with the Returning Officer along with required deposits and documents.",
        "key_activities": [
            "Candidates file nomination papers",
            "Security deposit submitted",
            "Affidavit with criminal/financial details",
            "Party symbols allocated"
        ]
    },
    {
        "id": "scrutiny",
        "step": "Scrutiny of Nominations",
        "icon": "🔍",
        "day": 8,
        "duration": "Day 8-10",
        "color": "#f97316",
        "description": "The Returning Officer examines all nomination papers to verify they meet legal requirements.",
        "key_activities": [
            "Verification of documents",
            "Checking eligibility criteria",
            "Rejection of invalid nominations",
            "Candidates can withdraw after scrutiny"
        ]
    },
    {
        "id": "campaign",
        "step": "Campaign Period",
        "icon": "📣",
        "day": 10,
        "duration": "Day 10-28",
        "color": "#22c55e",
        "description": "Political parties and candidates campaign to persuade voters. Campaign must stop 48 hours before polling.",
        "key_activities": [
            "Public rallies and meetings",
            "Door-to-door campaigning",
            "Media advertisements",
            "Expenditure monitoring by ECI"
        ]
    },
    {
        "id": "polling",
        "step": "Polling Day",
        "icon": "🗳️",
        "day": 30,
        "duration": "Day 30",
        "color": "#6366f1",
        "description": "Voters cast their votes using Electronic Voting Machines (EVMs) at designated polling booths.",
        "key_activities": [
            "Voting via EVM and VVPAT",
            "Identity verification at booth",
            "Indelible ink applied to finger",
            "Polling monitored by observers"
        ]
    },
    {
        "id": "counting",
        "step": "Vote Counting",
        "icon": "📊",
        "day": 32,
        "duration": "Day 32",
        "color": "#f59e0b",
        "description": "Votes are counted under supervision of the Returning Officer with ECI-appointed observers.",
        "key_activities": [
            "EVMs opened and counted",
            "VVPAT verification of random booths",
            "Round-wise results announced",
            "Candidates/agents can observe"
        ]
    },
    {
        "id": "result",
        "step": "Result Declaration",
        "icon": "🏆",
        "day": 33,
        "duration": "Day 33",
        "color": "#eab308",
        "description": "The candidate with the most votes is declared the winner. The new legislative body is constituted.",
        "key_activities": [
            "Winner declared by Returning Officer",
            "Certificate of election issued",
            "Results published officially",
            "Government formation begins"
        ]
    }
]

FLOWCHART_NODES = [
    {"id": "n1", "label": "Election Announced", "icon": "📢", "group": "pre", "x": 0, "y": 200},
    {"id": "n2", "label": "Model Code of Conduct", "icon": "📜", "group": "pre", "x": 250, "y": 200},
    {"id": "n3", "label": "Nomination Filing", "icon": "📝", "group": "pre", "x": 500, "y": 200},
    {"id": "n4", "label": "Scrutiny of Papers", "icon": "🔍", "group": "pre", "x": 750, "y": 200},
    {"id": "n5a", "label": "Accepted", "icon": "✅", "group": "pre", "x": 1000, "y": 100},
    {"id": "n5b", "label": "Rejected", "icon": "❌", "group": "pre", "x": 1000, "y": 300},
    {"id": "n6", "label": "Final Candidate List", "icon": "📋", "group": "pre", "x": 1250, "y": 100},
    {"id": "n7", "label": "Campaign Period", "icon": "📣", "group": "pre", "x": 1500, "y": 100},
    {"id": "n8", "label": "Silent Period (48hrs)", "icon": "🤫", "group": "election", "x": 1750, "y": 100},
    {"id": "n9", "label": "Polling Day", "icon": "🗳️", "group": "election", "x": 2000, "y": 200},
    {"id": "n10", "label": "Votes Cast via EVM", "icon": "🖥️", "group": "election", "x": 2250, "y": 200},
    {"id": "n11", "label": "Sealed & Stored", "icon": "🔒", "group": "election", "x": 2500, "y": 200},
    {"id": "n12", "label": "Counting Day", "icon": "📊", "group": "post", "x": 2750, "y": 200},
    {"id": "n13", "label": "Results Declared", "icon": "🏆", "group": "post", "x": 3000, "y": 200},
    {"id": "n14a", "label": "Clear Majority", "icon": "✅", "group": "post", "x": 3250, "y": 100},
    {"id": "n14b", "label": "No Majority", "icon": "⚖️", "group": "post", "x": 3250, "y": 300},
    {"id": "n15a", "label": "Government Formed", "icon": "🏛️", "group": "post", "x": 3500, "y": 100},
    {"id": "n15b", "label": "Coalition / Re-election", "icon": "🔄", "group": "post", "x": 3500, "y": 300},
]

FLOWCHART_EDGES = [
    {"source": "n1", "target": "n2"},
    {"source": "n2", "target": "n3"},
    {"source": "n3", "target": "n4"},
    {"source": "n4", "target": "n5a", "label": "Valid"},
    {"source": "n4", "target": "n5b", "label": "Invalid"},
    {"source": "n5a", "target": "n6"},
    {"source": "n6", "target": "n7"},
    {"source": "n7", "target": "n8"},
    {"source": "n8", "target": "n9"},
    {"source": "n9", "target": "n10"},
    {"source": "n10", "target": "n11"},
    {"source": "n11", "target": "n12"},
    {"source": "n12", "target": "n13"},
    {"source": "n13", "target": "n14a", "label": "Majority"},
    {"source": "n13", "target": "n14b", "label": "Hung"},
    {"source": "n14a", "target": "n15a"},
    {"source": "n14b", "target": "n15b"},
]

# ─── Simulation Decision Trees ──────────────────────────────────
SIMULATION_TREES = {
    "voter": {
        "title": "Voter Simulation",
        "description": "Experience the complete voting journey as an Indian citizen",
        "steps": {
            "start": {
                "id": "start",
                "prompt": "Welcome! You are a citizen of India. An election has been announced in your constituency. First — are you registered on the Electoral Roll?",
                "info": "Every Indian citizen aged 18+ must be registered on the Electoral Roll to vote. You can check your registration at nvsp.in.",
                "choices": [
                    {"label": "Yes, I'm registered", "action": "registered", "next": "check_id"},
                    {"label": "No, I'm not registered", "action": "not_registered", "next": "register"}
                ],
                "step_number": 1,
                "total_steps": 8
            },
            "register": {
                "id": "register",
                "prompt": "You need to register first! Apply using Form 6 online at nvsp.in or at your nearest Electoral Registration Office.",
                "info": "Registration requires: proof of age (birth certificate, school certificate), proof of address, and a passport-sized photo. Processing takes about 2-3 weeks.",
                "choices": [
                    {"label": "Apply for registration (Form 6)", "action": "apply", "next": "registration_pending"}
                ],
                "step_number": 2,
                "total_steps": 8
            },
            "registration_pending": {
                "id": "registration_pending",
                "prompt": "Your application has been submitted! After verification by the Block Level Officer (BLO), your name will be added to the Electoral Roll and you'll receive your EPIC (Voter ID) card.",
                "info": "The BLO may visit your residence for verification. Once approved, your Voter ID will be generated.",
                "choices": [
                    {"label": "Registration approved! Continue", "action": "approved", "next": "check_id"}
                ],
                "step_number": 3,
                "total_steps": 8
            },
            "check_id": {
                "id": "check_id",
                "prompt": "Great! Do you have your Voter ID card (EPIC - Electors Photo Identity Card)?",
                "info": "EPIC is the primary ID for voting. However, 11 other documents are also accepted as alternate ID proof at polling booths.",
                "choices": [
                    {"label": "Yes, I have my Voter ID", "action": "has_id", "next": "election_day"},
                    {"label": "I have an alternate ID (Aadhaar, Passport, etc.)", "action": "alt_id", "next": "election_day"},
                    {"label": "I don't have any valid ID", "action": "no_id", "next": "no_id_end"}
                ],
                "step_number": 3,
                "total_steps": 8
            },
            "no_id_end": {
                "id": "no_id_end",
                "prompt": "Unfortunately, you cannot vote without a valid identity document. Apply for your Voter ID card before the next election!",
                "info": "Without proper identification, the polling officer cannot verify your identity. This is a safeguard against voter fraud.",
                "is_end": True,
                "score": 20,
                "outcome": "incomplete",
                "choices": []
            },
            "election_day": {
                "id": "election_day",
                "prompt": "It's Polling Day! Head to your assigned polling booth. You can find your booth details on the Voter Helpline App or nvsp.in. Have you arrived?",
                "info": "Polling hours are typically 7:00 AM to 6:00 PM. Voters in queue before 6 PM are allowed to vote. A public holiday is declared on polling day.",
                "choices": [
                    {"label": "I've arrived at my polling booth", "action": "arrived", "next": "identity_check"}
                ],
                "step_number": 5,
                "total_steps": 8
            },
            "identity_check": {
                "id": "identity_check",
                "prompt": "The Polling Officer checks your name on the Electoral Roll and verifies your identity using your ID document. You are verified!",
                "info": "The Presiding Officer and Polling Officers manage each booth. They verify identity, issue ballot slips, and manage the EVM.",
                "choices": [
                    {"label": "Proceed to vote", "action": "proceed", "next": "cast_vote"}
                ],
                "step_number": 6,
                "total_steps": 8
            },
            "cast_vote": {
                "id": "cast_vote",
                "prompt": "You enter the voting compartment. Press the button next to your preferred candidate on the Electronic Voting Machine (EVM). The VVPAT machine prints a slip showing your vote for 7 seconds.",
                "info": "The EVM is a standalone device not connected to any network. The VVPAT (Voter Verified Paper Audit Trail) provides a paper record for verification.",
                "choices": [
                    {"label": "Cast my vote on the EVM", "action": "vote", "next": "ink_mark"}
                ],
                "step_number": 7,
                "total_steps": 8
            },
            "ink_mark": {
                "id": "ink_mark",
                "prompt": "🎉 Congratulations! Your vote has been cast successfully! Indelible ink is applied to your left index finger. This mark prevents double voting and stays for about 2 weeks.",
                "info": "The indelible ink contains silver nitrate and cannot be easily removed. It's a simple yet effective anti-fraud measure used since 1962.",
                "is_end": True,
                "score": 100,
                "outcome": "success",
                "choices": []
            }
        }
    },
    "candidate": {
        "title": "Candidate Simulation",
        "description": "Experience the election journey as a contesting candidate",
        "steps": {
            "start": {
                "id": "start",
                "prompt": "You want to contest in the upcoming election! First, let's check your eligibility. Are you an Indian citizen aged 25+ (Lok Sabha) or 30+ (Rajya Sabha)?",
                "info": "Eligibility: Must be a citizen of India, minimum age 25 for Lok Sabha / State Assembly, 30 for Rajya Sabha. Must not hold any office of profit under the government.",
                "choices": [
                    {"label": "Yes, I'm eligible", "action": "eligible", "next": "choose_party"},
                    {"label": "No, I'm not eligible", "action": "not_eligible", "next": "ineligible_end"}
                ],
                "step_number": 1,
                "total_steps": 7
            },
            "ineligible_end": {
                "id": "ineligible_end",
                "prompt": "You don't meet the eligibility criteria to contest this election. Work on meeting the requirements for the future!",
                "info": "Disqualification can also occur due to criminal convictions, corrupt practices, or government contracts.",
                "is_end": True, "score": 10, "outcome": "incomplete", "choices": []
            },
            "choose_party": {
                "id": "choose_party",
                "prompt": "Will you contest as a party candidate or as an independent?",
                "info": "Party candidates get a party symbol; independents are assigned a 'free' symbol by the ECI.",
                "choices": [
                    {"label": "Contest under a party", "action": "party", "next": "file_nomination"},
                    {"label": "Contest as independent", "action": "independent", "next": "file_nomination"}
                ],
                "step_number": 2, "total_steps": 7
            },
            "file_nomination": {
                "id": "file_nomination",
                "prompt": "File your nomination papers with the Returning Officer. You need to submit: nomination form, security deposit (₹25,000 for general, ₹12,500 for SC/ST), and an affidavit.",
                "info": "The affidavit must declare criminal cases, assets, liabilities, and educational qualifications. False information is punishable.",
                "choices": [
                    {"label": "Submit nomination papers", "action": "submit", "next": "scrutiny"}
                ],
                "step_number": 3, "total_steps": 7
            },
            "scrutiny": {
                "id": "scrutiny",
                "prompt": "Your nomination papers are under scrutiny by the Returning Officer. All documents are verified for correctness and eligibility...",
                "info": "The RO checks proposer validity, deposit receipt, affidavit completeness, and eligibility under the Representation of the People Act.",
                "choices": [
                    {"label": "Nomination accepted!", "action": "accepted", "next": "campaign"},
                    {"label": "Nomination rejected", "action": "rejected", "next": "rejected_end"}
                ],
                "step_number": 4, "total_steps": 7
            },
            "rejected_end": {
                "id": "rejected_end",
                "prompt": "Your nomination was rejected due to invalid documents. You can challenge this in court.",
                "info": "Common reasons: improper proposer, insufficient deposit, incorrect affidavit, or disqualification under RPA.",
                "is_end": True, "score": 25, "outcome": "incomplete", "choices": []
            },
            "campaign": {
                "id": "campaign",
                "prompt": "You're an official candidate! Campaign period begins. Organize rallies, media outreach, and door-to-door campaigns. Remember the expenditure limit!",
                "info": "Expenditure limit: ₹95 lakh (Lok Sabha), ₹40 lakh (Assembly). ECI deploys expenditure observers. Campaign must stop 48 hours before polling.",
                "choices": [
                    {"label": "Campaign completed, await polling day", "action": "done", "next": "results"}
                ],
                "step_number": 5, "total_steps": 7
            },
            "results": {
                "id": "results",
                "prompt": "🏆 Votes have been counted! You won the election with a clear majority! You'll receive your Certificate of Election from the Returning Officer.",
                "info": "The winner is decided by simple majority (First Past The Post). You must take oath within the prescribed time to assume office.",
                "is_end": True, "score": 100, "outcome": "success", "choices": []
            }
        }
    },
    "officer": {
        "title": "Election Officer Simulation",
        "description": "Manage elections as a Presiding Officer at a polling booth",
        "steps": {
            "start": {
                "id": "start",
                "prompt": "You've been appointed as the Presiding Officer for Booth #47. Your first task is to set up the booth on the evening before polling day.",
                "info": "The Presiding Officer is in charge of the polling station. They manage polling officers, EVMs, and ensure free and fair voting.",
                "choices": [
                    {"label": "Begin booth setup", "action": "setup", "next": "setup_evm"}
                ],
                "step_number": 1, "total_steps": 6
            },
            "setup_evm": {
                "id": "setup_evm",
                "prompt": "Set up the Electronic Voting Machine (EVM). Verify the Ballot Unit, Control Unit, and VVPAT are working. Conduct a mock poll with candidate agents present.",
                "info": "Mock poll: At least 50 votes are cast and verified via VVPAT before the actual poll. All counts must match. Agents of candidates witness this.",
                "choices": [
                    {"label": "Mock poll successful, clear counts", "action": "clear", "next": "polling_begins"}
                ],
                "step_number": 2, "total_steps": 6
            },
            "polling_begins": {
                "id": "polling_begins",
                "prompt": "Polling begins at 7:00 AM! Voters start arriving. Your team must verify identities, issue ballot slips, and manage the queue.",
                "info": "Your team: 1 Presiding Officer + 3-4 Polling Officers. One manages the electoral roll, one handles ink, one manages the EVM control unit.",
                "choices": [
                    {"label": "Handle a voter dispute", "action": "dispute", "next": "handle_dispute"},
                    {"label": "Continue smooth polling", "action": "continue", "next": "close_poll"}
                ],
                "step_number": 3, "total_steps": 6
            },
            "handle_dispute": {
                "id": "handle_dispute",
                "prompt": "A voter claims their vote was cast by someone else (impersonation). What do you do?",
                "info": "Under Section 49P of the Conduct of Elections Rules, you can issue a Tendered Ballot paper after proper verification.",
                "choices": [
                    {"label": "Issue tendered ballot after verification", "action": "tendered", "next": "close_poll"},
                    {"label": "Deny the claim and continue", "action": "deny", "next": "close_poll"}
                ],
                "step_number": 4, "total_steps": 6
            },
            "close_poll": {
                "id": "close_poll",
                "prompt": "It's 6:00 PM. Allow remaining voters in queue to vote, then close the poll. Seal the EVM in the presence of candidate agents.",
                "info": "After closing: Press the 'Close' button on the Control Unit. Seal all units. Fill Form 17C (Account of Votes). Get signatures from agents.",
                "choices": [
                    {"label": "Seal EVMs and complete paperwork", "action": "seal", "next": "transport"}
                ],
                "step_number": 5, "total_steps": 6
            },
            "transport": {
                "id": "transport",
                "prompt": "🎉 Great job! Transport the sealed EVMs to the Strong Room under security escort. Your duty is complete. The counting will happen on the designated day.",
                "info": "Strong Rooms are under 24/7 CCTV surveillance and guarded by security forces until counting day. Candidates can appoint agents to observe.",
                "is_end": True, "score": 100, "outcome": "success", "choices": []
            }
        }
    }
}
