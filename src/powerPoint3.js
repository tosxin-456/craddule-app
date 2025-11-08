import React, { useEffect, useRef, useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Palette,
    Type,
    Layout,
    Play,
    Users,
    Target,
    TrendingUp,
    DollarSign,
    Lightbulb,
    CheckCircle,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Globe,
    BarChart3,
    PieChart,
    Activity,
    Grid,
    ArrowDown,
    FileX,
    AlertCircle,
    Loader2,
    Plus,
    Briefcase,
    Cloud,
    Database,
    FileText,
    Folder,
    Layers,
    Lock,
    MessageSquare,
    Phone,
    Rocket,
    Search,
    Settings,
    Smile,
    Upload,
    Calendar,
    Code,
    Heart,
    Map,
    Award,
    BookOpen,
    Compass,
    Cpu,
    Package,
    Monitor,
    Inbox,
    Key,
    ThumbsUp,
    ChartLine,
    Clock,
    Image,
    Bus,
    ArrowUp,
    Edit,
    Edit3,
} from 'lucide-react';

import { API_BASE_URL } from './config/apiConfig';
import Header from './component/header';

export const iconMap = {
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "palette": Palette,
    "type": Type,
    "layout": Layout,
    "play": Play,
    "users": Users,
    "target": Target,
    "trending-up": TrendingUp,
    "dollar-sign": DollarSign,
    "lightbulb": Lightbulb,
    "check-circle": CheckCircle,
    "arrow-right": ArrowRight,
    "star": Star,
    "zap": Zap,
    "shield": Shield,
    "globe": Globe,
    "bar-chart-3": BarChart3,
    "chart-pie": PieChart,
    "activity": Activity,
    "grid": Grid,
    "arrow-down": ArrowDown,
    "file-x": FileX,
    "alert-circle": AlertCircle,
    "loader": Loader2,
    "plus": Plus,
    "briefcase": Briefcase,
    "cloud": Cloud,
    "database": Database,
    "file-text": FileText,
    "folder": Folder,
    "layers": Layers,
    "lock": Lock,
    "message-square": MessageSquare,
    "phone": Phone,
    "rocket": Rocket,
    "search": Search,
    "settings": Settings,
    "smile": Smile,
    "upload": Upload,
    "calendar": Calendar,
    "code": Code,
    "heart": Heart,
    "map": Map,
    "award": Award,
    "book-open": BookOpen,
    "compass": Compass,
    "cpu": Cpu,
    "package": Package,
    "monitor": Monitor,
    "inbox": Inbox,
    "key": Key,
    "thumbs-up": ThumbsUp,
    "chart-line": ChartLine,
    "bus": Bus,
    "arrow-up": ArrowUp
};


const PitchDeckSystem = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(null);
    const [error, setError] = useState(null);
    const projectId = localStorage.getItem('nProject');
    const token = localStorage.getItem('access_token');
    const [showSidebar, setShowSidebar] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const slideRef = useRef(null);
    const [isNotGenerated, setIsNotGenerated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Enhanced pitch deck data with different content structures
    const [slides, setSlides] = useState([]);

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    // Dynamic generation messages
    const generationMessages = [
        "Analyzing your project data...",
        "Creating slide layouts...",
        "Designing visual elements...",
        "Adding content to slides...",
        "Optimizing presentation flow...",
        "Working on the conclusion...",
        "Adding final touches...",
        "Rounding up your presentation..."
    ];


    useEffect(() => {
        const fetchPresentation = async () => {
            setLoading(true)
            console.log('Fetching presentation...');

            try {
                const res = await fetch(`${API_BASE_URL}/api/ppt/${projectId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 404) {
                        console.log('No presentation found, setting isGenerated to false');
                        setIsNotGenerated(false);
                    }
                    setLoading(false);
                    setIsNotGenerated(true); // Presentation was found
                    throw new Error(errorData.message || 'Failed to fetch presentation');

                }

                const data = await res.json();
                setLoading(false);

                console.log('Backend data:', data.slides);

                setSlides(data.slides);
                console.log(slides)
                console.log('Slides updated from backend');
            } catch (err) {
                console.error('Error:', err.message);
                setError(err.message);
            } finally {
                // setLoading(false);
            }
        };

        fetchPresentation();
    }, [projectId]);


    const generatePowerPoint = async () => {
        setIsGenerating(true);
        setErrorDisplay(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/ppt/generate/${projectId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Generated Summary:', data.powerPoint);
            setSlides(data.powerPoint.slides)
            setIsGenerating(false);
            setIsNotGenerated(false);


        } catch (error) {
            console.error('Error generating summary:', error);
            setErrorDisplay(error.message || 'Failed to generate summary. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const updatePowerPointFromConclusion = async (message) => {
        setIsGenerating(true);
        setErrorDisplay(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/ppt/update/${projectId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Generated Summary:', data.powerPoint);
            setSlides(data.powerPoint.slides);
            setIsNotGenerated(false);
            setIsOpen(false);
            setUpdateMessage(''); // Clear the textarea

        } catch (error) {
            // console.error('Error generating summary:', error);
            console.log(error)
            setErrorDisplay(error.message || 'Failed to generate summary. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };




    useEffect(() => {
        if (!isGenerating) return;

        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % generationMessages.length);
        }, 5000); // Change message every 2.5 seconds

        return () => clearInterval(interval);
    }, [isGenerating, generationMessages.length]);


    if (isNotGenerated) {
        return (
            <div
                style={{ fontFamily: '"Manrope", sans-serif' }}
                className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm min-h-64 animate-fade-in">
                <div className="flex flex-col items-center text-center max-w-md">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <FileX className="relative w-20 h-20 text-gray-400 animate-bounce-subtle" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 animate-slide-up">
                        No PowerPoint Available
                    </h3>

                    <p className="text-gray-600 text-center mb-8 leading-relaxed animate-slide-up delay-100">
                        Create a professional presentation from your project data.
                        We'll generate slides with smart layouts and design automatically.
                    </p>

                    {/* Generation Time Notice */}
                    <div className="w-full mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-slide-up delay-200">
                        <div className="flex items-start">
                            <Clock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-amber-800 mb-1">
                                    Please be patient
                                </p>
                                <p className="text-sm text-amber-700">
                                    Generation might take some time as our system is working to put together the best presentation for you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {errorDisplay && (
                        <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-800 mb-1">
                                        Generation Failed
                                    </p>
                                    <p className="text-sm text-red-700">
                                        {errorDisplay}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={generatePowerPoint}
                        disabled={isGenerating}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:cursor-not-allowed min-w-36 animate-slide-up delay-300 hover:scale-105 transform"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                <span key={currentMessageIndex} className="animate-fade-in-text">
                                    {generationMessages[currentMessageIndex]}
                                </span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2 animate-pulse" />
                                Generate PowerPoint
                            </>
                        )}
                    </button>

                    {/* Help Text */}
                    <p className="text-xs text-gray-500 mt-4 animate-slide-up delay-400">
                        This will create 8-16 professional slides based on your project summary
                    </p>

                    {/* Progress indicator when generating */}
                    {isGenerating && (
                        <div className="mt-6 w-full max-w-xs animate-slide-up delay-500">
                            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div className="bg-blue-600 h-2 rounded-full animate-progress-bar"></div>
                            </div>
                            <p key={`progress-${currentMessageIndex}`} className="text-xs text-gray-500 mt-2 text-center animate-fade-in-text">
                                {generationMessages[currentMessageIndex]}
                            </p>
                        </div>
                    )}
                </div>

                <style jsx>{`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
    
              @keyframes slide-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
    
              @keyframes bounce-subtle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
    
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
              }
    
              @keyframes progress-bar {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
    
              @keyframes fade-in-text {
                from { opacity: 0; }
                to { opacity: 1; }
              }
    
              .animate-fade-in {
                animation: fade-in 0.6s ease-out;
              }
    
              .animate-slide-up {
                animation: slide-up 0.6s ease-out both;
              }
    
              .animate-bounce-subtle {
                animation: bounce-subtle 2s ease-in-out infinite;
              }
    
              .animate-shake {
                animation: shake 0.5s ease-in-out;
              }
    
              .animate-progress-bar {
                animation: progress-bar 2s ease-in-out infinite;
              }
    
              .animate-fade-in-text {
                animation: fade-in-text 0.5s ease-in-out;
              }
    
              .delay-100 {
                animation-delay: 0.1s;
              }
    
              .delay-200 {
                animation-delay: 0.2s;
              }
    
              .delay-300 {
                animation-delay: 0.3s;
              }
    
              .delay-400 {
                animation-delay: 0.4s;
              }
    
              .delay-500 {
                animation-delay: 0.5s;
              }
            `}</style>
            </div>
        );
    }



    // Layout Templates - Different structural arrangements
    const layoutTemplates = [
        {
            name: 'Split View',
            component: 'SplitLayout',
            description: 'Classic left-right split with icon and bullet points'
        },
        {
            name: 'Center Focus',
            component: 'CenterLayout',
            description: 'Centered content with surrounding elements'
        },
        {
            name: 'Timeline Flow',
            component: 'TimelineLayout',
            description: 'Horizontal timeline with connected steps'
        },
        {
            name: 'Card Grid',
            component: 'CardLayout',
            description: 'Grid of cards with icons and content'
        },
        {
            name: 'Hero Banner',
            component: 'HeroLayout',
            description: 'Large hero section with overlay content'
        },
        {
            name: 'Stats Dashboard',
            component: 'StatsLayout',
            description: 'Data-focused layout with metrics and charts'
        },
        {
            name: 'Process Flow',
            component: 'ProcessLayout',
            description: 'Step-by-step process visualization'
        },
        {
            name: 'Image Layout',
            component: 'ImageLayout',
            description: 'Visual-centric slide with large image and minimal text'
        }

    ];


    const getBackgroundTemplates = (patternColor) => {
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        const rgb = hexToRgb(patternColor);
        const encodedColor = encodeURIComponent(patternColor);

        return [
            {
                name: 'Blank',
                className: 'bg-transparent',
                pattern: 'none',
            },
            {
                name: 'Neural Network',
                className: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
                pattern: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='neural' width='100' height='100' patternUnits='userSpaceOnUse'%3e%3ccircle cx='20' cy='20' r='2' fill='${encodedColor}' fill-opacity='0.3'/%3e%3ccircle cx='80' cy='20' r='2' fill='${encodedColor}' fill-opacity='0.3'/%3e%3ccircle cx='50' cy='50' r='2' fill='${encodedColor}' fill-opacity='0.4'/%3e%3ccircle cx='20' cy='80' r='2' fill='${encodedColor}' fill-opacity='0.3'/%3e%3ccircle cx='80' cy='80' r='2' fill='${encodedColor}' fill-opacity='0.3'/%3e%3cline x1='20' y1='20' x2='50' y2='50' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='1'/%3e%3cline x1='80' y1='20' x2='50' y2='50' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='1'/%3e%3cline x1='50' y1='50' x2='20' y2='80' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='1'/%3e%3cline x1='50' y1='50' x2='80' y2='80' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23neural)'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Abstract Constellation',
                className: 'bg-gradient-to-br from-purple-900 to-black',
                pattern: `url("data:image/svg+xml,%3csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='constellation' width='120' height='120' patternUnits='userSpaceOnUse'%3e%3ccircle cx='20' cy='20' r='1.5' fill='${encodedColor}' fill-opacity='0.4'/%3e%3ccircle cx='60' cy='30' r='2' fill='${encodedColor}' fill-opacity='0.5'/%3e%3ccircle cx='100' cy='40' r='1' fill='${encodedColor}' fill-opacity='0.3'/%3e%3ccircle cx='30' cy='70' r='1.5' fill='${encodedColor}' fill-opacity='0.4'/%3e%3ccircle cx='80' cy='80' r='2' fill='${encodedColor}' fill-opacity='0.5'/%3e%3ccircle cx='110' cy='90' r='1' fill='${encodedColor}' fill-opacity='0.3'/%3e%3cline x1='20' y1='20' x2='60' y2='30' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='0.5'/%3e%3cline x1='60' y1='30' x2='100' y2='40' stroke='${encodedColor}' stroke-opacity='0.15' stroke-width='0.5'/%3e%3cline x1='30' y1='70' x2='80' y2='80' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='0.5'/%3e%3cline x1='20' y1='20' x2='30' y2='70' stroke='${encodedColor}' stroke-opacity='0.1' stroke-width='0.5'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23constellation)'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Simple Dots',
                className: 'bg-gradient-to-br from-gray-900 to-slate-800',
                pattern: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='dots' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3ccircle cx='20' cy='20' r='2' fill='${encodedColor}' fill-opacity='0.3'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23dots)'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Flowing Topology',
                className: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900',
                pattern: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cpath d='M0 20c20 0 20-20 40-20s20 20 40 20 20-20 20-20v20c0 20-20 20-20 40s20 20 20 40-20 20-40 20-20-20-40-20-20 20-20 20V80c0-20 20-20 20-40S0 20 0 20z' fill='${encodedColor}' fill-opacity='0.1'/%3e%3cpath d='M20 0c0 20 20 20 20 40s-20 20-20 40 20 20 20 40-20 20-20 20h60c20 0 20-20 40-20s20 20 40 20 20-20 20-20H80c-20 0-20 20-40 20s-20-20-40-20 20-20 20-40-20-20-20-40 20-20 20-40S20 0 20 0z' fill='${encodedColor}' fill-opacity='0.08'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Wave Ripples',
                className: 'bg-gradient-to-br from-blue-900 to-cyan-900',
                pattern: `url("data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='ripples' width='80' height='80' patternUnits='userSpaceOnUse'%3e%3ccircle cx='40' cy='40' r='10' fill='none' stroke='${encodedColor}' stroke-opacity='0.15' stroke-width='1'/%3e%3ccircle cx='40' cy='40' r='20' fill='none' stroke='${encodedColor}' stroke-opacity='0.1' stroke-width='1'/%3e%3ccircle cx='40' cy='40' r='30' fill='none' stroke='${encodedColor}' stroke-opacity='0.05' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23ripples)'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Minimal Triangles',
                className: 'bg-gradient-to-br from-indigo-900 to-purple-900',
                pattern: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='triangles' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpolygon points='30,10 50,40 10,40' fill='none' stroke='${encodedColor}' stroke-opacity='0.2' stroke-width='1'/%3e%3cpolygon points='30,25 40,35 20,35' fill='${encodedColor}' fill-opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23triangles)'/%3e%3c/svg%3e")`,
            },
            {
                name: 'Soft Squares',
                className: 'bg-gradient-to-br from-slate-900 to-gray-800',
                pattern: `url("data:image/svg+xml,%3csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='squares' width='50' height='50' patternUnits='userSpaceOnUse'%3e%3crect x='15' y='15' width='20' height='20' fill='none' stroke='${encodedColor}' stroke-opacity='0.15' stroke-width='1'/%3e%3crect x='20' y='20' width='10' height='10' fill='${encodedColor}' fill-opacity='0.08'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23squares)'/%3e%3c/svg%3e")`,
            }
        ];
    };


    const updateSlidePattern = (patternIndex) => {
        const patterns = getBackgroundTemplates(currentTheme?.accentColor);
        const selectedPattern = patterns[patternIndex];

        setSlides(prev => {
            const newSlides = [...prev];
            newSlides[currentSlide] = {
                ...newSlides[currentSlide],
                slideTheme: {
                    ...newSlides[currentSlide]?.slideTheme,
                    patternIndex: patternIndex,
                    backgroundPattern: selectedPattern.pattern
                }
            };

            // Save to backend after state update
            saveUpdatedSlides(newSlides);

            return newSlides;
        });
    };

    if (loading) return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-[Manrope,sans-serif]"
        >
            <div className="text-center space-y-6">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

                {/* Main message */}
                <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    Preparing your pitch deck
                </p>

                {/* Subtitle */}
                <p className="text-gray-600 text-lg sm:text-xl">
                    Hang tight — we’re getting everything ready for you.
                </p>

                {/* Animated dots */}
                <div className="flex justify-center gap-2 mt-4">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
            </div>
        </div> 
    );



    const SplitLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center h-full px-2 lg:px-0">
                <div className="space-y-3 lg:space-y-6">
                    <div className="flex justify-center lg:justify-start">
                        <div style={{ color: theme?.accentColor }} className="text-3xl lg:text-5xl">
                            {SlideIcon ? <SlideIcon className="inline-block" size={48} /> : slide?.icon}
                        </div>
                    </div>
                    <div className="text-center lg:text-left">
                        <h5 className="text-lg lg:text-5xl font-bold mb-2 lg:mb-4 leading-tight">{slide?.title}</h5>
                        <h6 className="text-base lg:text-2xl mb-3 lg:mb-6 opacity-80">{slide?.subtitle}</h6>
                        <p className="text-sm lg:text-lg opacity-90 leading-relaxed">{slide?.content}</p>
                    </div>
                </div>

                <div className="space-y-2 lg:space-y-4">
                    {slide?.items.map((item, index) => {
                        const ItemIcon = iconMap[item?.icon];
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 lg:gap-4 p-2 lg:p-4 rounded-lg bg-black bg-opacity-10 backdrop-blur-sm"
                            >
                                <div
                                    style={{ color: theme?.accentColor }}
                                    className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-opacity-10"
                                >
                                    {ItemIcon ? <ItemIcon className="inline-block" size={20} /> : item?.icon}
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm lg:text-lg">{item.text}</p>
                                </div>
                                {item.value && (
                                    <div className="text-lg lg:text-2xl font-bold" style={{ color: theme?.accentColor }}>
                                        {item.value}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const ImageSplitLayout = ({ slide, theme }) => {
        const [imageUrl, setImageUrl] = useState(slide?.imageUrl);

        // Enhanced frontend with compression
        const handleImageUpload = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            console.log('Uploading file:', file.name, file.size, file.type);

            const uploadedImageUrl = await uploadSlideImage(file, currentSlide); // ⛔ Make sure currentSlide is in scope
            if (uploadedImageUrl) {
                setSlides((prev) => {
                    const newSlides = [...prev];
                    newSlides[currentSlide] = {
                        ...newSlides[currentSlide],
                        imageUrl: uploadedImageUrl,
                    };
                    return newSlides;
                });
            }
        };



        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center h-full px-2 lg:px-0">
                {/* Left Side - Text Content */}
                <div className="space-y-3 lg:space-y-6">
                    <div className="text-center lg:text-left">
                        <h5 className="text-lg lg:text-5xl font-bold mb-2 lg:mb-4 leading-tight">{slide?.title}</h5>
                        <h6 className="text-base lg:text-2xl mb-3 lg:mb-6 opacity-80">{slide?.subtitle}</h6>
                    </div>

                    {/* Enhanced Items with Icons and Values */}
                    {slide?.items && (
                        <div className="space-y-2 lg:space-y-4">
                            {slide.items.map((item, index) => {
                                const ItemIcon = iconMap[item?.icon];
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 lg:gap-4 p-2 lg:p-4 rounded-lg bg-black bg-opacity-10 backdrop-blur-sm"
                                    >
                                        <div
                                            style={{ color: theme?.accentColor }}
                                            className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-opacity-10"
                                        >
                                            {ItemIcon ? <ItemIcon className="inline-block" size={20} /> : (
                                                item?.icon ? (
                                                    <span className="text-sm lg:text-base">{item.icon}</span>
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-current"></div>
                                                )
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm lg:text-lg">{item.text}</p>
                                        </div>

                                        {item.value && (
                                            <div className="text-lg lg:text-2xl font-bold" style={{ color: theme?.accentColor }}>
                                                {item.value}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Fallback for Legacy Points Format */}
                    {slide?.points && !slide?.items && (
                        <div className="space-y-2 lg:space-y-4">
                            {slide.points.map((point, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 lg:gap-4 p-2 lg:p-4 rounded-lg bg-black bg-opacity-10 backdrop-blur-sm"
                                >
                                    <div
                                        style={{ color: theme?.accentColor }}
                                        className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-opacity-10"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-current"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm lg:text-lg">{point}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side - Image */}
                <div className="flex items-center justify-center">
                    {imageUrl || slide?.imageUrl ? (
                        <div className="relative group w-full max-w-md flex items-center justify-center">
                            <img
                                src={imageUrl ? `${API_BASE_URL}${imageUrl}` : `${API_BASE_URL}${slide?.imageUrl}`}
                                alt="Slide"
                                className="w-[80%] h-[80%] object-contain rounded-lg"
                                style={{
                                    borderRadius: `${theme?.borderRadius || 8}px`,
                                    opacity: theme?.imageOpacity || 1,
                                }}
                            />

                            {/* Desktop hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg items-center justify-center hidden lg:flex">
                                <button
                                    onClick={() => document.getElementById('image-upload-input').click()}
                                    className="text-white px-3 py-1 rounded text-sm hover:bg-opacity-80 transition-colors"
                                    style={{ backgroundColor: theme?.accentColor || '#3B82F6' }}
                                >
                                    Change Image
                                </button>
                            </div>

                            {/* Mobile/Tablet edit button */}
                            <button
                                onClick={() => document.getElementById('image-upload-input').click()}
                                className="absolute top-2 right-2 lg:hidden w-8 h-8 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors"
                                style={{ backgroundColor: theme?.accentColor || '#3B82F6' }}
                            >
                                ✎
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-md">
                            <button
                                onClick={() => document.getElementById('image-upload-input').click()}
                                className="w-full h-48 lg:h-64 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all group border-2 border-dashed border-opacity-30 bg-black bg-opacity-10"
                                style={{
                                    borderColor: theme?.accentColor || 'rgba(255,255,255,0.3)',
                                    borderRadius: `${theme?.borderRadius || 8}px`
                                }}
                            >
                                <Image className="w-8 h-8 lg:w-12 lg:h-12 opacity-60 group-hover:opacity-80 mb-2 transition-opacity" />
                                <span className="text-xs lg:text-sm opacity-60 group-hover:opacity-80 text-center px-2 transition-opacity">
                                    Add image
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Hidden file input */}
                <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
        );
    };

    const CenterLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="text-center space-y-4 lg:space-y-8 h-full flex flex-col justify-center px-2 lg:px-0">
                <div style={{ color: theme?.accentColor }} className="flex justify-center text-3xl lg:text-5xl">
                    {SlideIcon ? <SlideIcon className="inline-block" size={48} /> : slide?.icon}
                </div>
                <div>
                    <h5 className="text-2xl lg:text-5xl font-bold mb-2 lg:mb-4">{slide?.title}</h5>
                    <h6 className="text-lg lg:text-2xl mb-3 lg:mb-6 opacity-80">{slide?.subtitle}</h6>
                    <p className="text-sm lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">{slide?.content}</p>
                </div>
                <div className="flex justify-center flex-wrap gap-3 lg:gap-8 mt-4 lg:mt-8">
                    {slide?.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-3 lg:p-6 rounded-lg bg-black bg-opacity-10 backdrop-blur-sm min-w-20 lg:min-w-32"
                        >
                            <div className="text-xl lg:text-3xl font-bold mb-1 lg:mb-2" style={{ color: theme?.accentColor }}>
                                {stat.value}
                            </div>
                            <div className="text-xs lg:text-sm opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    const TimelineLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="h-full flex flex-col justify-center px-2 lg:px-0">
                <div className="text-center mb-6 lg:mb-12">
                    <div style={{ color: theme?.accentColor }} className="flex justify-center mb-2 lg:mb-4 text-3xl lg:text-5xl">
                        {SlideIcon ? <SlideIcon className="inline-block" size={48} /> : slide?.icon}
                    </div>
                    <h5 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">{slide?.title}</h5>
                    <h6 className="text-base lg:text-xl opacity-80 mb-2 lg:mb-4">{slide?.subtitle}</h6>
                    <p className="text-sm lg:text-lg opacity-90 max-w-2xl mx-auto">{slide?.content}</p>
                </div>
                <div className="relative">
                    <div
                        className="absolute top-4 lg:top-6 left-0 right-0 h-0.5 bg-opacity-30"
                        style={{ backgroundColor: theme?.accentColor }}
                    />
                    <div className="flex justify-between items-start">
                        {slide?.items.map((item, index) => {
                            const ItemIcon = iconMap[item?.icon];
                            return (
                                <div key={index} className="flex-1 text-center relative">
                                    <div
                                        className="w-8 h-8 lg:w-12 lg:h-12 rounded-full mx-auto mb-2 lg:mb-4 flex items-center justify-center text-white font-bold text-sm lg:text-base"
                                        style={{ backgroundColor: theme?.accentColor }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="px-1 lg:px-4">
                                        <p className="text-xs lg:text-sm mb-1 lg:mb-2 opacity-90">{item.text}</p>
                                        {item.value && (
                                            <div className="text-sm lg:text-lg font-bold" style={{ color: theme?.accentColor }}>
                                                {item.value}
                                            </div>
                                        )}
                                    </div>
                                    {index < slide?.items.length - 1 && (
                                        <ArrowRight
                                            className="absolute -right-1 lg:-right-4 top-2 lg:top-4 w-4 h-4 lg:w-6 lg:h-6 opacity-60"
                                            style={{ color: theme?.accentColor }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };


    const CardLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="h-full flex flex-col px-2 lg:px-0">
                <div className="text-center mb-4 lg:mb-8">
                    <div style={{ color: theme?.accentColor }} className="flex justify-center mb-2 lg:mb-4 text-3xl lg:text-5xl">
                        {SlideIcon ? <SlideIcon className="inline-block" size={48} /> : slide?.icon}
                    </div>
                    <h5 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">{slide?.title}</h5>
                    <h6 className="text-base lg:text-xl opacity-80 mb-2 lg:mb-4">{slide?.subtitle}</h6>
                    <p className="text-sm lg:text-lg opacity-90 max-w-2xl mx-auto">{slide?.content}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:gap-6 flex-1">
                    {slide?.items.map((item, index) => {
                        const ItemIcon = iconMap[item?.icon];
                        return (
                            <div
                                key={index}
                                className="p-3 lg:p-6 rounded-xl bg-black bg-opacity-10 backdrop-blur-sm flex flex-col items-center text-center"
                            >
                                {item.icon && (
                                    <div className="mb-2 lg:mb-4 text-lg lg:text-2xl" style={{ color: theme?.accentColor }}>
                                        {ItemIcon ? <ItemIcon className="inline-block" size={32} /> : item.icon}
                                    </div>
                                )}
                                <p className="text-xs lg:text-sm mb-2 lg:mb-3 opacity-90">{item.text}</p>
                                {item.value && (
                                    <div className="text-lg lg:text-2xl font-bold" style={{ color: theme?.accentColor }}>
                                        {item.value}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const HeroLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="h-full flex items-center justify-center relative px-2 lg:px-0">
                <div className="absolute inset-0 bg-grey bg-opacity-40"></div>
                <div className="relative z-10 text-center max-w-4xl">
                    <div style={{ color: theme?.accentColor }} className="flex justify-center mb-3 lg:mb-6 text-4xl lg:text-6xl">
                        {SlideIcon ? <SlideIcon className="inline-block" size={56} /> : slide?.icon}
                    </div>
                    <h5 className="text-3xl lg:text-6xl font-bold mb-3 lg:mb-6">{slide?.title}</h5>
                    <h6 className="text-xl lg:text-3xl mb-4 lg:mb-8 opacity-90">{slide?.subtitle}</h6>
                    <p className="text-sm lg:text-xl mb-6 lg:mb-12 opacity-80 leading-relaxed">{slide?.content}</p>
                    <div className="flex justify-center gap-6 lg:gap-12">
                        {slide?.stats.slice(0, 3).map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-lg lg:text-xl font-bold mb-1 lg:mb-2" style={{ color: theme?.accentColor }}>
                                    {stat.value}
                                </div>
                                <div className="text-sm lg:text-lg opacity-80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    const StatsLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 h-full items-center px-2 lg:px-0">
                <div className="col-span-1 space-y-3 lg:space-y-6 text-center lg:text-left">
                    <div style={{ color: theme?.accentColor }} className="text-3xl lg:text-5xl">
                        {SlideIcon ? <SlideIcon className="inline-block" size={48} /> : slide?.icon}
                    </div>
                    <h5 className="text-xl lg:text-3xl font-bold">{slide?.title}</h5>
                    <h6 className="text-sm lg:text-lg opacity-80">{slide?.subtitle}</h6>
                    <p className="text-xs lg:text-base opacity-90 leading-relaxed">{slide?.content}</p>
                </div>
                <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3 lg:gap-6">
                    {slide?.items.map((item, index) => {
                        const ItemIcon = iconMap[item?.icon];
                        return (
                            <div key={index} className="p-3 lg:p-6 rounded-xl bg-black bg-opacity-10 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2 lg:mb-3">
                                    <div className="text-xl lg:text-3xl font-bold" style={{ color: theme?.accentColor }}>
                                        {item.value}
                                    </div>
                                    {item.icon && (
                                        <div style={{ color: theme?.accentColor }} className="text-lg lg:text-xl">
                                            {ItemIcon ? <ItemIcon className="inline-block" size={24} /> : item.icon}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs lg:text-sm opacity-90">{item.text}</p>
                                <div className="mt-2 lg:mt-3 h-1.5 lg:h-2 bg-black bg-opacity-20 rounded-full">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            backgroundColor: theme?.accentColor,
                                            width: `${75 + index * 5}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };


    const ProcessLayout = ({ slide, theme }) => {
        const SlideIcon = iconMap[slide?.icon] || Shield; // Use Shield as default fallback

        return (
            <div className="h-full flex flex-col justify-center px-2 lg:px-0">
                <div className="text-center mb-4 lg:mb-8">
                    <div style={{ color: theme?.accentColor }} className="flex justify-center mt-6 mb-2 lg:mb-4 text-3xl lg:text-5xl">
                        {SlideIcon ? <SlideIcon className="inline-block mt-5 " size={48} /> : slide?.icon}
                    </div>
                    <h5 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">{slide?.title}</h5>
                    <h6 className="text-base lg:text-xl opacity-80 mb-2 lg:mb-4">{slide?.subtitle}</h6>
                    <p className="text-sm lg:text-lg opacity-90 max-w-2xl mx-auto">{slide?.content}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                    {slide?.items.map((item, index) => {
                        const ItemIcon = iconMap[item?.icon];
                        return (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center text-center max-w-48">
                                    <div
                                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full mb-2 lg:mb-4 flex items-center justify-center text-white font-bold text-lg lg:text-xl"
                                        style={{ backgroundColor: theme?.accentColor }}
                                    >
                                        {ItemIcon ? <ItemIcon className="inline-block" size={28} /> : item.icon || index + 1}
                                    </div>
                                    <h3 className="font-semibold mb-1 lg:mb-2 text-sm lg:text-base" style={{ color: theme?.accentColor }}>
                                        {item.value}
                                    </h3>
                                    <p className="text-xs lg:text-sm opacity-90">{item.text}</p>
                                </div>
                                {index < slide?.items.length - 1 && (
                                    <div className="flex-1 mx-4 lg:block hidden">
                                        <ArrowRight className="w-8 h-8 mx-auto opacity-60" style={{ color: theme?.accentColor }} />
                                    </div>
                                )}
                                {index < slide?.items.length - 1 && (
                                    <div className="lg:hidden">
                                        <ArrowDown className="w-6 h-6 opacity-60" style={{ color: theme?.accentColor }} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        );
    };


    const renderLayout = () => {
        const currentSlideData = slides[currentSlide];
        const currentTheme = slides[currentSlide]?.slideTheme;
        // console.log(currentTheme)
        const currentLayout = layoutTemplates[currentTheme?.layoutIndex];


        const layoutProps = {
            slide: currentSlideData,
            theme: currentTheme
        };

        switch (currentLayout?.component) {
            case 'SplitLayout': return <SplitLayout {...layoutProps} />;
            case 'CenterLayout': return <CenterLayout {...layoutProps} />;
            case 'TimelineLayout': return <TimelineLayout {...layoutProps} />;
            case 'CardLayout': return <CardLayout {...layoutProps} />;
            case 'HeroLayout': return <HeroLayout {...layoutProps} />;
            case 'StatsLayout': return <StatsLayout {...layoutProps} />;
            case 'ProcessLayout': return <ProcessLayout {...layoutProps} />;
            case 'ImageLayout': return <ImageSplitLayout {...layoutProps} />;
            default: return <SplitLayout {...layoutProps} />;
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides?.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    };

    const updateSlideTheme = async (property, value) => {
        setSlides(prev => {
            const newSlides = [...prev];
            const current = newSlides[currentSlide];

            let updatedSlideTheme = {
                ...current.slideTheme,
                [property]: value
            };

            // If updating patternIndex, also update backgroundPattern
            if (property === 'patternIndex') {
                const patterns = getBackgroundTemplates(currentTheme?.accentColor);
                const selectedPattern = patterns[value];
                updatedSlideTheme.backgroundPattern = selectedPattern?.pattern || '';
            }

            newSlides[currentSlide] = {
                ...current,
                slideTheme: updatedSlideTheme
            };

            // Save to backend after updating state
            saveUpdatedSlides(newSlides);

            return newSlides;
        });
    };


    const saveUpdatedSlides = async (updatedSlides) => {
        try {
            const token = localStorage.getItem('access_token');
            await fetch(`${API_BASE_URL}/api/ppt/edit/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ slides: updatedSlides }),
            });
            console.log('Slides synced to backend');
        } catch (error) {
            console.error('Failed to sync slides:', error);
        }
    };

    const uploadSlideImage = async (file, slideIndex) => {
        const formData = new FormData();
        formData.append('slideImage', file); // name must match multer field
        formData.append('slideIndex', slideIndex.toString());

        // 🔍 Log all form fields before upload
        console.log('📦 FormData contents:');
        for (let pair of formData.entries()) {
            if (pair[1] instanceof File) {
                console.log(`${pair[0]}:`, pair[1].name, pair[1].type, pair[1].size);
            } else {
                console.log(`${pair[0]}:`, pair[1]);
            }
        }

        const token = localStorage.getItem('access_token');

        try {
            const response = await fetch(`${API_BASE_URL}/api/ppt/edit-image/${projectId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // ❗DO NOT manually set Content-Type when using FormData
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('❌ Upload failed:', data);
                throw new Error(data.message || JSON.stringify(data));
            }

            console.log('✅ Image uploaded:', data.imageUrl);
            return data.imageUrl;
        } catch (error) {
            console.error('❌ Upload error:', error);
            alert('Failed to upload image.');
            return null;
        }
    };






    const currentSlideData = slides[currentSlide];
    const currentTheme = slides[currentSlide]?.slideTheme;
    const currentLayout = layoutTemplates[currentTheme?.layoutIndex];
    const templates = getBackgroundTemplates(currentTheme?.accentColor);
    const template = templates[currentTheme?.backgroundTemplateIndex || 0];

    return (
        <>
            <Header />

            <div
                style={{
                    fontFamily: 'Manrope'
                }}
                className="min-h-screen bg-gray-100 p-2 sm:p-4"

            >
                {/* Enhanced Control Panel - Mobile Responsive */}
                <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
                        {/* Mobile: Stack controls vertically, Desktop: Horizontal */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 sm:items-center">
                            {/* Current Slide Info - Full width on mobile */}
                            <div className="flex items-center justify-center sm:justify-start gap-3 order-1">
                                <span className="text-sm font-semibold text-gray-700 text-center sm:text-left">
                                    Slide {currentSlide + 1}: {currentSlideData?.title}
                                </span>
                            </div>
                            {/* Mobile: Two columns for selectors */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:gap-6 order-2 sm:order-none">
                                {/* Layout Selector */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">Layout:</label>
                                    <select
                                        value={currentTheme?.layoutIndex}
                                        onChange={(e) => updateSlideTheme('layoutIndex', Number(e.target.value))}
                                        className="flex-1 min-w-0 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {layoutTemplates.map((layout, index) => (
                                            <option key={index} value={index}>{layout.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Pattern Selector */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">Pattern:</label>
                                    <select
                                        value={currentTheme?.patternIndex || 0}
                                        onChange={(e) => updateSlidePattern(Number(e.target.value))}
                                        className="flex-1 min-w-0 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {getBackgroundTemplates(currentTheme?.accentColor).map((pattern, index) => (
                                            <option key={index} value={index}>{pattern.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Color Controls - Grid layout on mobile */}
                            <div className="grid grid-cols-3 sm:flex gap-3 sm:gap-6 order-3 sm:order-none">
                                {/* Background Color */}
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Background:</label>
                                        <label className="text-xs font-medium text-gray-700 sm:hidden">BG</label>
                                    </div>
                                    <input
                                        type="color"
                                        value={currentTheme?.backgroundColor}
                                        onChange={(e) => updateSlideTheme('backgroundColor', e.target.value)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded cursor-pointer"
                                    />
                                </div>

                                {/* Accent Color */}
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Accent:</label>
                                        <label className="text-xs font-medium text-gray-700 sm:hidden">Accent</label>
                                    </div>
                                    <input
                                        type="color"
                                        value={currentTheme?.accentColor}
                                        onChange={(e) => updateSlideTheme('accentColor', e.target.value)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded cursor-pointer"
                                    />
                                </div>

                                {/* Text Color */}
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Text:</label>
                                        <label className="text-xs font-medium text-gray-700 sm:hidden">Text</label>
                                    </div>
                                    <input
                                        type="color"
                                        value={currentTheme?.textColor}
                                        onChange={(e) => updateSlideTheme('textColor', e.target.value)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded cursor-pointer"
                                    />
                                </div>

                                {/* Edit Button */}
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Edit:</label>
                                        <label className="text-xs font-medium text-gray-700 sm:hidden">Edit</label>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${isOpen
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {isOpen ? (
                                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>



                            {/* Layout Description - Hidden on mobile, visible on larger screens */}
                            <div className="hidden lg:flex lg:ml-auto items-center gap-2 order-4">
                                <span className="text-xs text-gray-500 max-w-48">
                                    {currentLayout?.description}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {currentSlide + 1} / {slides?.length}
                                </span>
                            </div>

                            {/* Mobile slide counter */}
                            <div className="flex lg:hidden justify-center items-center order-4">
                                <span className="text-sm text-gray-600 font-medium">
                                    {currentSlide + 1} / {slides?.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                            {!isGenerating ? (
                                // Normal modal view
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-lg font-semibold text-gray-800">Update Pitch Deck</p>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <textarea
                                        placeholder="Optional message (e.g. 'Add AI angle', 'Focus more on financials')"
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows="4"
                                        value={updateMessage}
                                        onChange={(e) => setUpdateMessage(e.target.value)}
                                    />

                                    <div className="flex gap-3 justify-end">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            onClick={() => updatePowerPointFromConclusion(updateMessage)}
                                        >
                                            Update Pitch Deck
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // Loading view
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-lg font-semibold text-gray-800 mb-2">Updating Pitch Deck</p>
                                    <p className="text-gray-600">Please wait while we update your presentation...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}



                {/* Main Slide Container - Responsive aspect ratio */}
                <div className="max-w-6xl mx-auto">
                    <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
                        style={{ aspectRatio: window.innerWidth < 640 ? '4/3' : '16/9' }}>
                        {/* Slide Content - Responsive padding with extra space for arrows on mobile */}
                        <div
                            className="relative w-full h-full px-6 py-2 sm:px-8 sm:py-8 lg:px-12 lg:py-12 text-xs sm:text-base"
                            style={{
                                backgroundColor: currentTheme?.backgroundColor,
                                backgroundImage: currentTheme?.backgroundPattern || getBackgroundTemplates(currentTheme?.accentColor)[currentTheme?.patternIndex || 0].pattern,
                                color: currentTheme?.textColor,
                                fontSize: window.innerWidth < 640 ? '0.6rem' : undefined
                            }}
                        >
                            <div className="h-full overflow-auto">
                                {renderLayout()}
                            </div>

                            {/* Slide Number - Responsive positioning and size */}
                            <div className="absolute bottom-1 right-1 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-full px-1.5 py-0.5 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 z-10">
                                <span className="text-xs sm:text-sm font-medium">{currentSlide + 1}</span>
                            </div>
                        </div>

                        {/* Navigation Arrows - Improved mobile positioning */}
                        <button
                            onClick={prevSlide}
                            className="absolute hidden lg:block left-0 sm:left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm rounded-r-lg sm:rounded-full p-2 sm:p-3 transition-all duration-200 touch-manipulation z-20 shadow-lg"
                            style={{ color: 'white' }}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute  hidden lg:block right-0 sm:right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm rounded-l-lg sm:rounded-full p-2 sm:p-3 transition-all duration-200 touch-manipulation z-20 shadow-lg"
                            style={{ color: 'white' }}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        </button>
                    </div>

                    {/* Mobile Navigation Buttons - Alternative approach */}
                    <div className="mt-2 sm:hidden flex justify-between items-center bg-white rounded-lg shadow-md p-2">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors duration-200 text-sm touch-manipulation"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <span className="text-sm font-medium text-gray-600">
                            {currentSlide + 1} / {slides?.length}
                        </span>

                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides?.length - 1}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors duration-200 text-sm touch-manipulation"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Enhanced Slide Thumbnails - Mobile responsive */}
                    <div className="mt-4 sm:mt-6 flex justify-center overflow-x-auto">
                        <div className="flex gap-1 sm:gap-2 bg-white rounded-lg p-2 sm:p-4 shadow-lg min-w-max">
                            {slides?.map((slide, index) => {
                                const thumbTheme = slide?.slideTheme;
                                const thumbLayout = layoutTemplates[slide?.slideTheme?.layoutIndex];

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-12 h-8 sm:w-16 sm:h-10 lg:w-20 lg:h-12 rounded-md border-2 transition-all duration-200 overflow-hidden relative flex-shrink-0 touch-manipulation ${currentSlide === index
                                            ? 'border-blue-500 ring-1 sm:ring-2 ring-blue-200'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: slide?.slideTheme?.backgroundColor }}

                                    >
                                        <div className="absolute inset-0 p-0.5 sm:p-1">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div
                                                    className="text-xs font-medium opacity-75"
                                                    style={{ color: thumbTheme?.textColor }}
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>
                                            {/* Layout indicator */}
                                            <div
                                                className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full"
                                                style={{ backgroundColor: thumbTheme?.accentColor }}
                                            ></div>
                                        </div>

                                        {/* Hover tooltip - Hidden on mobile */}
                                        <div className="hidden sm:block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                                            {slide?.title} - {thumbLayout.name}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Presentation Controls - Mobile responsive */}
                    <div className="mt-4 sm:mt-6 flex justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 w-full max-w-2xl">
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                                {/* Mobile: Stack buttons and info */}
                                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                    <div className="flex gap-2 sm:gap-4">
                                        <button
                                            onClick={() => setCurrentSlide(0)}
                                            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 text-sm touch-manipulation"
                                        >
                                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Start Over</span>
                                            <span className="sm:hidden">Reset</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                // Simple fullscreen toggle for presentation mode
                                                const elem = document.documentElement;
                                                if (!document.fullscreenElement) {
                                                    elem.requestFullscreen?.();
                                                } else {
                                                    document.exitFullscreen?.();
                                                }
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors duration-200 text-sm touch-manipulation"
                                        >
                                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                            Present
                                        </button>
                                    </div>

                                    {/* Info text - Responsive layout */}
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left">
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            Layout: <span className="font-medium">{currentLayout?.name}</span>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            Theme: <span className="font-medium">Custom</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PitchDeckSystem;