<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craddule - Build Your Dreams</title>
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        overflow-x: hidden;
    }

    /* Shared Styles */
    .section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        width: 100%;
    }

    .content-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .text-content h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        line-height: 1.2;
    }

    .text-content p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        line-height: 1.7;
        opacity: 0.8;
    }

    .divider {
        width: 60px;
        height: 3px;
        background: #4f46e5;
        margin: 1.5rem 0;
    }

    /* Section 1 - Meet Abby (White with AI image) */
    .section-1 {
        background: #ffffff;
        color: #1a1a1a;
    }

    .abby-visual {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
    }

    .ai-container {
        position: relative;
        width: 400px;
        height: 400px;
        border-radius: 20px;
        overflow: hidden;
        background: url('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=500&fit=crop&crop=center') center/cover;
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .ai-container:hover {
        transform: scale(1.05);
    }

    .ai-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(79, 70, 229, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .ai-container:hover .ai-overlay {
        opacity: 1;
    }

    .ai-badge {
        background: rgba(255, 255, 255, 0.95);
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        font-weight: 600;
        color: #4f46e5;
        backdrop-filter: blur(10px);
    }

    /* Section 2 - Questions (Team color background) */
    .section-2 {
        background: #4f46e5;
        color: white;
    }

    .questions-visual {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .question-card {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 2rem;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .question-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .question-card h4 {
        color: #ffffff;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .question-card p {
        font-size: 1rem;
        opacity: 0.9;
        margin: 0;
    }

    /* Section 3 - Refinement (White with tech image) */
    .section-3 {
        background: #ffffff;
        color: #1a1a1a;
    }

    .refinement-visual {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        height: 500px;
    }

    .refinement-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=500&fit=crop&crop=center') center/cover;
        border-radius: 20px;
        filter: brightness(0.9);
    }

    .text-transformation {
        position: relative;
        z-index: 2;
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 16px;
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease;
    }

    .text-transformation:hover {
        transform: scale(1.02);
    }

    .before-text,
    .after-text {
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }

    .before-text {
        background: #fee2e2;
        border-left: 4px solid #ef4444;
    }

    .after-text {
        background: #dcfce7;
        border-left: 4px solid #22c55e;
    }

    .transformation-arrow {
        text-align: center;
        color: #4f46e5;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 1rem 0;
    }

    /* Section 4 - Pitch (Background image) */
    .section-4 {
        background: url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center') center/cover;
        color: white;
        position: relative;
    }

    .section-4::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .section-4 .container {
        position: relative;
        z-index: 2;
    }

    .pitch-visual {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pitch-deck {
        width: 350px;
        height: 250px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(20px);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .pitch-deck:hover {
        transform: translateY(-10px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .pitch-deck h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    .pitch-deck p {
        font-size: 1rem;
        text-align: center;
        margin: 0;
        opacity: 0.9;
    }

    /* Section 5 - CTA (Clean white) */
    .section-5 {
        background: #ffffff;
        color: #1a1a1a;
        text-align: center;
    }

    .cta-content {
        max-width: 600px;
        margin: 0 auto;
    }

    .cta-btn {
        background: #4f46e5;
        color: white;
        padding: 1.2rem 3rem;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        margin-top: 2rem;
    }

    .cta-btn:hover {
        background: #3730a3;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
    }

    /* Floating elements */
    .floating-elements {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }

    .floating-circle {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(79, 70, 229, 0.1);
        animation: float 6s ease-in-out infinite;
    }

    .floating-circle:nth-child(1) {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }

    .floating-circle:nth-child(2) {
        top: 60%;
        right: 15%;
        animation-delay: 2s;
    }

    .floating-circle:nth-child(3) {
        bottom: 30%;
        left: 20%;
        animation-delay: 4s;
    }

    /* Animations */
    @keyframes float {

        0%,
        100% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-20px);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }

        .text-content h2 {
            font-size: 2rem;
        }

        .text-content p {
            font-size: 1rem;
        }

        .ai-container {
            width: 300px;
            height: 300px;
        }

        .pitch-deck {
            width: 280px;
            height: 200px;
        }

        .pitch-deck h3 {
            font-size: 1.4rem;
        }
    }
    </style>
</head>

<body>
    <!-- Section 1: Meet Abby -->
    <section class="section section-1">
        <div class="floating-elements">
            <div class="floating-circle"></div>
            <div class="floating-circle"></div>
            <div class="floating-circle"></div>
        </div>
        <div class="container">
            <div class="content-wrapper">
                <div class="text-content">
                    <h2>Meet Abby — The Heart of Your Business Journey</h2>
                    <div class="divider"></div>
                    <p>Your vision matters — and Abby is here to bring it to life.</p>
                    <p>Think of Abby as the engine that powers your business dreams. She's your AI partner, designed not
                        just to help you start a business, but to shape it around your values, your goals, and your
                        voice. Abby doesn't tell you what your business should be — she helps you build the one you
                        believe in.</p>
                </div>
                <div class="abby-visual">
                    <div class="ai-container">
                        <div class="ai-overlay">
                            <div class="ai-badge">Meet Abby</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 2: Questions -->
    <section class="section section-2">
        <div class="container">
            <div class="content-wrapper">
                <div class="questions-visual">
                    <div class="question-card">
                        <h4>What's your vision?</h4>
                        <p>Tell us about the impact you want to make in the world.</p>
                    </div>
                    <div class="question-card">
                        <h4>Who's your audience?</h4>
                        <p>Help us understand who you're building this for.</p>
                    </div>
                    <div class="question-card">
                        <h4>What's your advantage?</h4>
                        <p>What makes your approach uniquely valuable?</p>
                    </div>
                </div>
                <div class="text-content">
                    <h2>We Ask the Right Questions — So You Can Give the Right Answers</h2>
                    <div class="divider"></div>
                    <p>Building a business starts with asking the right questions.</p>
                    <p>Abby guides you through a smart, adaptive questionnaire — tailored specifically to your business
                        type, stage, and aspirations. Each question is designed to draw out clarity and strategy,
                        helping you form the backbone of your core business documents, one thoughtful answer at a time.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 3: Refinement -->
    <section class="section section-3">
        <div class="container">
            <div class="content-wrapper">
                <div class="text-content">
                    <h2>Your Words, Refined by Abby</h2>
                    <div class="divider"></div>
                    <p>Turn your thoughts into polished, powerful narratives.</p>
                    <p>Once you've answered the curated questions, Abby steps in again — reviewing your inputs and
                        enhancing them with smart suggestions, improved phrasing, and strategic language. It's not just
                        spellcheck — it's storycraft, backed by AI, aligned with your voice.</p>
                </div>
                <div class="refinement-visual">
                    <div class="refinement-bg"></div>
                    <div class="text-transformation">
                        <div class="before-text">
                            <strong>Before:</strong> "My app helps people find restaurants nearby that are good."
                        </div>
                        <div class="transformation-arrow">↓</div>
                        <div class="after-text">
                            <strong>After:</strong> "Our platform connects food enthusiasts with exceptional local
                            dining experiences, curated through AI-powered recommendations and real-time availability."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: Pitch -->
    <section class="section section-4">
        <div class="container">
            <div class="content-wrapper">
                <div class="pitch-visual">
                    <div class="pitch-deck">
                        <h3>Your Pitch Deck</h3>
                        <p>Compelling • Professional • Investor-Ready</p>
                    </div>
                </div>
                <div class="text-content">
                    <h2>Your Vision, Now a Pitch</h2>
                    <div class="divider"></div>
                    <p>Documents are just the beginning — now it's time to present.</p>
                    <p>Abby transforms your refined content into a compelling pitch deck, tailored to capture the
                        attention of investors, partners, and collaborators. Whether you're in the room or sending it
                        across the world, Abby ensures your story is heard — and remembered.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 5: CTA -->
    <section class="section section-5">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Build Something That Feels Like You?</h2>
                <div class="divider" style="margin: 2rem auto;"></div>
                <p>Let Abby help you get started.</p>
                <p>Whether you're at step one or step twenty, it starts with a conversation.</p>
                <a href="#" class="cta-btn">Get Started</a>
            </div>
        </div>
    </section>
</body>

</html>