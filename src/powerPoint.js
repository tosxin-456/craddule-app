import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Edit3,
    Save,
    Download,
    Plus,
    Trash2,
    Copy,
    Palette,
    Type,
    Layout,
    Play,
    Menu,
    X,
    Maximize2,
    Eye,
    Settings,
    MoreVertical,
    Upload,
    FileText,
    Image,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Underline,
    Undo,
    Redo,
    ZoomIn,
    ZoomOut,
    Grid,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-react';

const PresentationEditor = () => {
    const [slides, setSlides] = useState([
        {
            id: 1,
            title: "Welcome to Your Presentation",
            subtitle: "Create stunning presentations with ease",
            points: [
                "Professional templates and layouts",
                "Easy-to-use editing interface",
                "Export and share capabilities"
            ],
            design: {
                backgroundColor: "#6366f1",
                textColor: "#ffffff",
                layout: "title-and-subtitle",
                fontSize: "normal",
                fontFamily: "Inter",
                alignment: "center"
            }
        },
        {
            id: 2,
            title: "Key Features",
            subtitle: "Everything you need for great presentations",
            points: [
                "Multiple layout options",
                "Customizable colors and fonts",
                "Responsive design for all devices",
                "Export to JSON format",
                "Presentation mode with navigation"
            ],
            design: {
                backgroundColor: "#0f172a",
                textColor: "#f1f5f9",
                layout: "bullets-left",
                fontSize: "normal",
                fontFamily: "Inter",
                alignment: "left"
            }
        },
        {
            id: 3,
            title: "Get Started",
            subtitle: "Ready to create your presentation?",
            points: [
                "Click Edit to modify content",
                "Use the sidebar to manage slides",
                "Customize colors and layouts",
                "Present your work with confidence"
            ],
            design: {
                backgroundColor: "#10b981",
                textColor: "#ffffff",
                layout: "centered-message",
                fontSize: "normal",
                fontFamily: "Inter",
                alignment: "center"
            }
        }
    ]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [showDesignPanel, setShowDesignPanel] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [presentationTitle, setPresentationTitle] = useState("My Presentation");
    const [zoomLevel, setZoomLevel] = useState(100);
    const [viewMode, setViewMode] = useState('mobile'); // Start with mobile view
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const fileInputRef = useRef(null);

    // Touch swipe handling
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        if (isRightSwipe && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // Save state to history for undo/redo
    const saveToHistory = () => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ slides: [...slides], currentSlide });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    useEffect(() => {
        // Initialize history
        if (history.length === 0) {
            setHistory([{ slides: [...slides], currentSlide }]);
            setHistoryIndex(0);
        }
    }, []);

    const undo = () => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            setSlides(prevState.slides);
            setCurrentSlide(prevState.currentSlide);
            setHistoryIndex(historyIndex - 1);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            setSlides(nextState.slides);
            setCurrentSlide(nextState.currentSlide);
            setHistoryIndex(historyIndex + 1);
        }
    };

    const updateSlide = (slideIndex, field, value) => {
        const newSlides = [...slides];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newSlides[slideIndex][parent] = { ...newSlides[slideIndex][parent], [child]: value };
        } else {
            newSlides[slideIndex][field] = value;
        }
        setSlides(newSlides);
        saveToHistory();
    };

    const addSlide = (template = null) => {
        const templates = {
            title: {
                title: "New Title Slide",
                subtitle: "Your subtitle here",
                points: [],
                design: { backgroundColor: "#6366f1", textColor: "#ffffff", layout: "title-and-subtitle", fontSize: "normal", fontFamily: "Inter", alignment: "center" }
            },
            bullets: {
                title: "New Slide",
                subtitle: "",
                points: ["First point", "Second point", "Third point"],
                design: { backgroundColor: "#ffffff", textColor: "#1e293b", layout: "bullets-left", fontSize: "normal", fontFamily: "Inter", alignment: "left" }
            },
            image: {
                title: "Image Slide",
                subtitle: "Add your image content here",
                points: ["Supporting point 1", "Supporting point 2"],
                design: { backgroundColor: "#f8fafc", textColor: "#334155", layout: "image-and-text", fontSize: "normal", fontFamily: "Inter", alignment: "center" }
            }
        };

        const newSlide = {
            id: Date.now(),
            ...(template && templates[template] ? templates[template] : templates.bullets)
        };

        setSlides([...slides, newSlide]);
        setCurrentSlide(slides.length);
        setShowSidebar(false);
        setShowMobileMenu(false);
        saveToHistory();
    };

    const deleteSlide = (index) => {
        if (slides.length > 1) {
            const newSlides = slides.filter((_, i) => i !== index);
            setSlides(newSlides);
            if (currentSlide >= newSlides.length) {
                setCurrentSlide(newSlides.length - 1);
            }
            saveToHistory();
        }
    };

    const duplicateSlide = (index) => {
        const slideToDuplicate = { ...slides[index], id: Date.now() };
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, slideToDuplicate);
        setSlides(newSlides);
        saveToHistory();
    };

    const addPoint = () => {
        const newSlides = [...slides];
        newSlides[currentSlide].points.push("New point");
        setSlides(newSlides);
        saveToHistory();
    };

    const updatePoint = (pointIndex, value) => {
        const newSlides = [...slides];
        newSlides[currentSlide].points[pointIndex] = value;
        setSlides(newSlides);
    };

    const deletePoint = (pointIndex) => {
        const newSlides = [...slides];
        if (newSlides[currentSlide].points.length > 1) {
            newSlides[currentSlide].points.splice(pointIndex, 1);
            setSlides(newSlides);
            saveToHistory();
        }
    };

    const exportPresentation = (format = 'json') => {
        const presentation = {
            title: presentationTitle,
            created: new Date().toISOString(),
            slides: slides
        };

        if (format === 'json') {
            const dataStr = JSON.stringify(presentation, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${presentationTitle.toLowerCase().replace(/\s+/g, '-')}.json`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const loadPresentation = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.slides && Array.isArray(data.slides)) {
                        setSlides(data.slides);
                        setPresentationTitle(data.title || "Imported Presentation");
                        setCurrentSlide(0);
                        saveToHistory();
                    } else {
                        alert('Invalid presentation file format.');
                    }
                } catch (error) {
                    alert('Error loading file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const nextSlide = () => {
        setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(Math.max(0, currentSlide - 1));
    };

    const colorPresets = [
        '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
        '#10b981', '#06b6d4', '#3b82f6', '#1f2937', '#000000',
        '#ffffff', '#f8fafc', '#e2e8f0', '#94a3b8', '#475569'
    ];

    const fontFamilies = [
        'Inter', 'Helvetica', 'Arial', 'Georgia', 'Times New Roman',
        'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Lato'
    ];

    const layouts = [
        { id: 'title-and-subtitle', name: 'Title & Subtitle', icon: AlignCenter },
        { id: 'bullets-left', name: 'Bullet Points', icon: AlignLeft },
        { id: 'bullets-center', name: 'Centered Bullets', icon: AlignCenter },
        { id: 'two-columns', name: 'Two Columns', icon: Grid },
        { id: 'image-and-text', name: 'Image & Text', icon: Image },
        { id: 'stats-highlight', name: 'Statistics', icon: Type },
        { id: 'timeline', name: 'Timeline', icon: Layout },
        { id: 'centered-message', name: 'Centered Message', icon: AlignCenter }
    ];

    const renderSlideContent = (slide, isPreview = false) => {
        const { title, subtitle, points, design } = slide;

        const containerClass = isPreview
            ? 'text-xs p-2'
            : isPresentationMode
                ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl p-4 sm:p-6 md:p-8'
                : 'text-sm sm:text-base p-3 sm:p-4 md:p-6';

        const titleClass = isPreview
            ? 'text-xs font-bold'
            : isPresentationMode
                ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'
                : 'text-lg sm:text-xl md:text-2xl font-bold';

        const subtitleClass = isPreview
            ? 'text-xs opacity-80'
            : isPresentationMode
                ? 'text-base sm:text-lg md:text-xl opacity-90'
                : 'text-sm sm:text-base opacity-90';

        const fontSizeMultiplier = design.fontSize === 'large' ? 1.2 : design.fontSize === 'small' ? 0.8 : 1;

        const dynamicStyle = {
            backgroundColor: design.backgroundColor,
            color: design.textColor,
            fontFamily: design.fontFamily || 'Inter',
            fontSize: isPreview ? undefined : `${fontSizeMultiplier}em`,
            textAlign: design.alignment || 'left'
        };

        return (
            <div
                className={`w-full h-full rounded-lg shadow-lg overflow-hidden ${containerClass}`}
                style={dynamicStyle}
            >
                {design.layout === 'title-and-subtitle' && (
                    <div className="flex flex-col justify-center items-center h-full text-center space-y-2 sm:space-y-4">
                        <p className={titleClass}>{title}</p>
                        {subtitle && <p className={subtitleClass}>{subtitle}</p>}
                        {points.length > 0 && (
                            <div className="space-y-1 sm:space-y-2 mt-4">
                                {points.map((point, idx) => (
                                    <p key={idx} className="opacity-90 leading-relaxed text-xs sm:text-sm">{point}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {(design.layout === 'bullets-left' || design.layout === 'bullets-center') && (
                    <div className="h-full flex flex-col">
                        <div className={`mb-3 sm:mb-4 ${design.layout === 'bullets-center' ? 'text-center' : ''}`}>
                            <p className={titleClass}>{title}</p>
                            {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-3">
                            {points.map((point, idx) => (
                                <div key={idx} className={`flex items-start ${design.layout === 'bullets-center' ? 'justify-center' : ''}`}>
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                                    <span className="leading-relaxed text-xs sm:text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {design.layout === 'two-columns' && (
                    <div className="h-full flex flex-col">
                        <div className="text-center mb-3 sm:mb-4">
                            <p className={titleClass}>{title}</p>
                            {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                            {points.map((point, idx) => (
                                <div key={idx} className="flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-10 rounded-lg text-center backdrop-blur-sm">
                                    <span className="leading-relaxed text-xs sm:text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {design.layout === 'image-and-text' && (
                    <div className="h-full flex flex-col">
                        <div className="text-center mb-3 sm:mb-4">
                            <p className={titleClass}>{title}</p>
                            {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        </div>
                        <div className="flex-1 grid grid-cols-1 gap-3 sm:gap-4 items-center">
                            <div className="bg-black bg-opacity-10 rounded-lg aspect-video flex items-center justify-center backdrop-blur-sm">
                                <Image className="w-8 h-8 sm:w-12 sm:h-12 opacity-50" />
                            </div>
                            <div className="space-y-2">
                                {points.map((point, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                                        <span className="leading-relaxed text-xs sm:text-sm">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {design.layout === 'stats-highlight' && (
                    <div className="h-full flex flex-col">
                        <div className="text-center mb-3 sm:mb-4">
                            <p className={titleClass}>{title}</p>
                            {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-4">
                            {points.map((point, idx) => (
                                <div key={idx} className="text-center p-3 sm:p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                                    <div className="text-lg sm:text-2xl font-bold mb-1">
                                        {point.match(/[\d,₦$€£¥+%]+/) ? point.match(/[\d,₦$€£¥+%]+/)[0] : '★'}
                                    </div>
                                    <p className="text-xs sm:text-sm opacity-90">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {design.layout === 'timeline' && (
                    <div className="h-full flex flex-col">
                        <div className="text-center mb-3 sm:mb-4">
                            <p className={titleClass}>{title}</p>
                            {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-4">
                            {points.map((point, idx) => (
                                <div key={idx} className="flex items-start">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-current rounded-full text-black flex items-center justify-center mr-2 sm:mr-3 text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <span className="leading-relaxed pt-0.5 text-xs sm:text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {design.layout === 'centered-message' && (
                    <div className="flex flex-col justify-center items-center h-full text-center space-y-2 sm:space-y-4">
                        <p className={titleClass}>{title}</p>
                        {subtitle && <p className={`${subtitleClass} mt-1 sm:mt-2`}>{subtitle}</p>}
                        {points.length > 0 && (
                            <div className="space-y-1 sm:space-y-2 mt-4">
                                {points.map((point, idx) => (
                                    <p key={idx} className="opacity-90 leading-relaxed text-xs sm:text-sm">{point}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPresentationMode) {
                if (e.key === 'ArrowRight' || e.key === ' ') {
                    e.preventDefault();
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                } else if (e.key === 'Escape') {
                    setIsPresentationMode(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPresentationMode, currentSlide, slides.length]);

    if (isPresentationMode) {
        return (
            <div className="min-h-screen bg-black flex flex-col">
                <div className="flex-1 p-2 sm:p-4 md:p-8">
                    <div className="w-full h-full max-w-7xl mx-auto">
                        {renderSlideContent(slides[currentSlide])}
                    </div>
                </div>

                <div className="bg-gray-900 p-3 sm:p-4 flex items-center justify-between">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="p-2 sm:p-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="flex items-center space-x-2 sm:space-x-4 text-white">
                        <span className="text-sm font-medium">
                            {currentSlide + 1} / {slides.length}
                        </span>
                        <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
                            <span>Use ← → or Space to navigate</span>
                            <span>•</span>
                            <span>ESC to exit</span>
                        </div>
                        <button
                            onClick={() => setIsPresentationMode(false)}
                            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        className="p-2 sm:p-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{ fontFamily: '"Manrope", sans-serif' }}
        className="min-h-screen bg-gray-50 flex flex-col">
            {/* Mobile Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>

                        <input
                            type="text"
                            value={presentationTitle}
                            onChange={(e) => setPresentationTitle(e.target.value)}
                            className="text-base sm:text-lg font-semibold text-gray-800 bg-transparent border-none outline-none hover:bg-gray-50 px-1 sm:px-2 py-1 rounded sm:w-auto"
                            placeholder="Title"
                        />
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                            onClick={() => setIsPresentationMode(true)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            title="Present"
                        >
                            <Play className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`p-2 rounded-lg transition-colors ${isEditing ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100 text-gray-600'}`}
                            title="Edit"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-full h-full max-w-sm overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800">Menu</h3>
                                <button
                                    onClick={() => setShowMobileMenu(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Quick Actions */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {
                                            addSlide('title');
                                            setShowMobileMenu(false);
                                        }}
                                        className="p-3 text-left bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mb-1" />
                                        <div className="text-sm font-medium">Title Slide</div>
                                    </button>
                                    <button
                                        onClick={() => {
                                            addSlide('bullets');
                                            setShowMobileMenu(false);
                                        }}
                                        className="p-3 text-left bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mb-1" />
                                        <div className="text-sm font-medium">Bullets</div>
                                    </button>
                                </div>
                            </div>

                            {/* Design */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Design</h4>
                                <button
                                    onClick={() => {
                                        setShowDesignPanel(true);
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full p-3 text-left bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <Palette className="w-4 h-4 inline mr-2" />
                                    Customize Design
                                </button>
                            </div>

                            {/* File Operations */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">File</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            exportPresentation('json');
                                            setShowMobileMenu(false);
                                        }}
                                        className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Download className="w-4 h-4 inline mr-2" />
                                        Export
                                    </button>
                                    <button
                                        onClick={() => {
                                            fileInputRef.current?.click();
                                            setShowMobileMenu(false);
                                        }}
                                        className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Upload className="w-4 h-4 inline mr-2" />
                                        Import
                                    </button>
                                </div>
                            </div>

                            {/* Slides */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Slides ({slides.length})</h4>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {slides.map((slide, index) => (
                                        <div
                                            key={slide.id}
                                            onClick={() => {
                                                setCurrentSlide(index);
                                                setShowMobileMenu(false);
                                            }}
                                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${currentSlide === index
                                                    ? 'border-blue-300 bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 mb-1">Slide {index + 1}</div>
                                                    <div className="text-sm font-medium text-gray-800 truncate">{slide.title}</div>
                                                    {slide.subtitle && (
                                                        <div className="text-xs text-gray-600 mt-1 truncate">{slide.subtitle}</div>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-1 ml-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            duplicateSlide(index);
                                                            setShowMobileMenu(false);
                                                        }}
                                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                                                        title="Duplicate"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </button>
                                                    {slides.length > 1 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteSlide(index);
                                                                setShowMobileMenu(false);
                                                            }}
                                                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">View Mode</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                                        { id: 'desktop', icon: Monitor, label: 'Desktop' }
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => {
                                                setViewMode(mode.id);
                                                setShowMobileMenu(false);
                                            }}
                                            className={`p-2 rounded-lg border text-center transition-colors ${viewMode === mode.id
                                                    ? 'border-blue-300 bg-blue-50 text-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <mode.icon className="w-4 h-4 mx-auto mb-1" />
                                            <div className="text-xs font-medium">{mode.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Design Panel */}
            {showDesignPanel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-full h-full max-w-sm ml-auto overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800">Design Options</h3>
                                <button
                                    onClick={() => setShowDesignPanel(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Layout */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">Layout</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {layouts.map((layout) => (
                                        <button
                                            key={layout.id}
                                            onClick={() => updateSlide(currentSlide, 'design.layout', layout.id)}
                                            className={`p-3 text-left rounded-lg border transition-colors ${slides[currentSlide].design.layout === layout.id
                                                    ? 'border-blue-300 bg-blue-50 text-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <layout.icon className="w-4 h-4 mb-1" />
                                            <div className="text-xs font-medium">{layout.name}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">Background Color</h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {colorPresets.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => updateSlide(currentSlide, 'design.backgroundColor', color)}
                                            className={`w-10 h-10 rounded-lg border-2 transition-all ${slides[currentSlide].design.backgroundColor === color
                                                    ? 'border-gray-800 scale-110'
                                                    : 'border-gray-300 hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                    ))}
                                </div>

                                <h4 className="font-medium text-gray-700 mb-3 mt-4">Text Color</h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {colorPresets.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => updateSlide(currentSlide, 'design.textColor', color)}
                                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${slides[currentSlide].design.textColor === color
                                                    ? 'border-gray-800 scale-110'
                                                    : 'border-gray-300 hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        >
                                            <Type className="w-4 h-4" style={{ color: color === '#ffffff' || color === '#f8fafc' ? '#000' : '#fff' }} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Font */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">Font Family</h4>
                                <select
                                    value={slides[currentSlide].design.fontFamily || 'Inter'}
                                    onChange={(e) => updateSlide(currentSlide, 'design.fontFamily', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {fontFamilies.map((font) => (
                                        <option key={font} value={font} style={{ fontFamily: font }}>
                                            {font}
                                        </option>
                                    ))}
                                </select>

                                <h4 className="font-medium text-gray-700 mb-3 mt-4">Font Size</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {['small', 'normal', 'large'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => updateSlide(currentSlide, 'design.fontSize', size)}
                                            className={`p-2 rounded-lg border text-center transition-colors capitalize ${slides[currentSlide].design.fontSize === size
                                                    ? 'border-blue-300 bg-blue-50 text-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                <h4 className="font-medium text-gray-700 mb-3 mt-4">Alignment</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'left', icon: AlignLeft, label: 'Left' },
                                        { id: 'center', icon: AlignCenter, label: 'Center' },
                                        { id: 'right', icon: AlignRight, label: 'Right' }
                                    ].map((align) => (
                                        <button
                                            key={align.id}
                                            onClick={() => updateSlide(currentSlide, 'design.alignment', align.id)}
                                            className={`p-2 rounded-lg border text-center transition-colors ${slides[currentSlide].design.alignment === align.id
                                                    ? 'border-blue-300 bg-blue-50 text-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <align.icon className="w-4 h-4 mx-auto mb-1" />
                                            <div className="text-xs font-medium">{align.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={loadPresentation}
                className="hidden"
            />

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Desktop */}
                <div className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${showSidebar ? 'w-80' : 'w-16'
                    }`}>
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            {showSidebar && <h3 className="font-semibold text-gray-800">Slides</h3>}
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {showSidebar ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {showSidebar && (
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-3">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`group relative cursor-pointer rounded-lg transition-all ${currentSlide === index
                                                ? 'ring-2 ring-blue-500 shadow-md'
                                                : 'hover:shadow-md'
                                            }`}
                                    >
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                            {renderSlideContent(slide, true)}
                                        </div>

                                        <div className="p-3">
                                            <div className="text-xs text-gray-500 mb-1">Slide {index + 1}</div>
                                            <div className="text-sm font-medium text-gray-800 truncate">{slide.title}</div>
                                        </div>

                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        duplicateSlide(index);
                                                    }}
                                                    className="p-1 text-gray-600 hover:text-blue-600 rounded"
                                                    title="Duplicate"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                                {slides.length > 1 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteSlide(index);
                                                        }}
                                                        className="p-1 text-gray-600 hover:text-red-600 rounded"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Slide Button */}
                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={() => addSlide('title')}
                                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-600 text-sm"
                                >
                                    <Plus className="w-4 h-4 mx-auto mb-1" />
                                    Add Title Slide
                                </button>
                                <button
                                    onClick={() => addSlide('bullets')}
                                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-gray-600 hover:text-green-600 text-sm"
                                >
                                    <Plus className="w-4 h-4 mx-auto mb-1" />
                                    Add Content Slide
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Toolbar */}
                    <div className="bg-white border-b border-gray-200 p-2 sm:p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <div className="hidden sm:flex items-center space-x-1">
                                    <button
                                        onClick={undo}
                                        disabled={historyIndex <= 0}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        title="Undo"
                                    >
                                        <Undo className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={redo}
                                        disabled={historyIndex >= history.length - 1}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        title="Redo"
                                    >
                                        <Redo className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                </div>

                                <button
                                    onClick={() => setShowDesignPanel(true)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Design"
                                >
                                    <Palette className="w-4 h-4" />
                                </button>

                                <div className="hidden lg:flex items-center space-x-1">
                                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                                        {[
                                            { id: 'mobile', icon: Smartphone },
                                            { id: 'tablet', icon: Tablet },
                                            { id: 'desktop', icon: Monitor }
                                        ].map((mode) => (
                                            <button
                                                key={mode.id}
                                                onClick={() => setViewMode(mode.id)}
                                                className={`p-1.5 rounded transition-colors ${viewMode === mode.id
                                                        ? 'bg-white text-blue-600 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-800'
                                                    }`}
                                                title={mode.id}
                                            >
                                                <mode.icon className="w-4 h-4" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                                    <span>{currentSlide + 1} / {slides.length}</span>
                                </div>

                                <button
                                    onClick={prevSlide}
                                    disabled={currentSlide === 0}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    title="Previous"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    disabled={currentSlide === slides.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    title="Next"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Slide Canvas */}
                    <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-100 overflow-auto">
                        <div className="flex justify-center items-center min-h-full">
                            <div
                                className={`relative bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ${viewMode === 'mobile'
                                        ? 'w-full max-w-sm aspect-[9/16]'
                                        : viewMode === 'tablet'
                                            ? 'w-full max-w-2xl aspect-[4/3]'
                                            : 'w-full max-w-5xl aspect-[16/9]'
                                    }`}
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {renderSlideContent(slides[currentSlide])}

                                {/* Touch Navigation Indicators */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden">
                                    <div className="flex space-x-1">
                                        {slides.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Panel */}
                    {isEditing && (
                        <div className="bg-white border-t border-gray-200 p-3 sm:p-4 max-h-80 overflow-y-auto">
                            <div className="max-w-4xl mx-auto space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={slides[currentSlide].title}
                                            onChange={(e) => updateSlide(currentSlide, 'title', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter slide title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                        <input
                                            type="text"
                                            value={slides[currentSlide].subtitle}
                                            onChange={(e) => updateSlide(currentSlide, 'subtitle', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter subtitle (optional)"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">Content Points</label>
                                        <button
                                            onClick={addPoint}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            <Plus className="w-4 h-4 inline mr-1" />
                                            Add Point
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {slides[currentSlide].points.map((point, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={point}
                                                    onChange={(e) => updatePoint(index, e.target.value)}
                                                    onBlur={() => saveToHistory()}
                                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder={`Point ${index + 1}`}
                                                />
                                                <button
                                                    onClick={() => deletePoint(index)}
                                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete point"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PresentationEditor;