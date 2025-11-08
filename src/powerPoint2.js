import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Edit3, Save, Download, Plus, Trash2, Image, Type, Palette, Layout, Eye, EyeOff, Play, Square, Maximize2, MoreVertical, FileText, Clock, Menu, X, FileX, AlertCircle, Loader2 } from 'lucide-react';
import bg1 from '../src/images/power point bg/Wrapper1.png';
import bg2 from '../src/images/power point bg/Wrapper2.png';
import bg3 from '../src/images/power point bg/Wrapper3.png';
import { API_BASE_URL } from './config/apiConfig';
import Header from './component/header';
import RenderSlideContent from './component/renderSlideContent';
import EnhancedSlideEditor from './component/editingPowerpoint';
import { useNavigate } from 'react-router-dom';

// console.log(bg1)


const PowerPointPresentation = () => {
    // Note: Replace these placeholder SVG strings with your actual imports
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const [presentation, setPresentation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(null);
    const [error, setError] = useState(null);


    // For now, using placeholder SVG content - replace with your actual imports

    const backgrounds = {
        bg9: bg1,
        bg10: bg2,
        bg11: bg3,
        bg1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bg2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        bg3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        bg4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        bg5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        bg6: 'linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%)',
        bg7: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        bg8: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        bg12: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bg13: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        bg14: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        bg15: '#ffffff', // white
        bg16: '#000000', // black
        bg17: '#f5f5f5', // light gray
        bg18: '#808080', // medium gray
        bg19: '#333333', // dark gray
        bg20: '#001f3f', // navy
        bg21: '#3d9970', // olive
        bg22: '#800000', // maroon
        bg23: '#008080', // teal
        bg24: '#c0c0c0'  // silver
    };





    const [slides, setSlides] = useState(
        [

        ]
    );
    const projectId = localStorage.getItem('nProject');
    const token = localStorage.getItem('access_token');

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

                // Ensure each slide has proper default values
                const normalizedSlides = data.slides.map(slide => ({
                    ...slide,
                    design: {
                        backgroundColor: "#ffffff",
                        textColor: "#000000",
                        layout: "title-and-subtitle",
                        background: "bg1",
                        ...slide.design,
                        textColor: slide.design?.textColor || "#000000"
                    }
                }));

                setSlides(normalizedSlides);
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



    const [currentSlide, setCurrentSlide] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoPlayInterval, setAutoPlayInterval] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const slideRef = useRef(null);
    const [isNotGenerated, setIsNotGenerated] = useState(false);
    const navigate = useNavigate()


    const layouts = [
        { key: "title-and-subtitle", name: "Title & Subtitle" },
        { key: "bullets-left", name: "Bullets Left" },
        { key: "bullets-right", name: "Bullets Right" },
        { key: "bullets-center", name: "Bullets Center" },
        { key: "icon-and-bullets", name: "Icon & Bullets" },
        { key: "stats-highlight", name: "Stats Highlight" },
        { key: "two-columns", name: "Two Columns" },
        { key: "three-columns", name: "Three Columns" },
        { key: "timeline", name: "Timeline" },
        { key: "centered-message", name: "Centered Message" },
        { key: "image-left-text-right", name: "Image Left, Text Right" },
        { key: "image-right-text-left", name: "Image Right, Text Left" },
        { key: "image-background-text-overlay", name: "Image Background with Text Overlay" },
        { key: "comparison-layout", name: "Comparison Layout" },
        { key: "quote-layout", name: "Quote Layout" },
        { key: "contact-layout", name: "Contact Layout" }
    ];

    const themes = [
        { key: 'default', name: 'Default' },
        { key: 'corporate', name: 'Corporate' },
        { key: 'creative', name: 'Creative' },
        { key: 'minimal', name: 'Minimal' },
        { key: 'dark', name: 'Dark' },
        { key: 'professional', name: 'Professional' },
        { key: 'academic', name: 'Academic' }
    ];

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // 2. Dynamic font size calculation
    const calculateFontSize = (text, containerWidth, baseSize) => {
        const textLength = text.length;
        if (textLength > 50) return Math.max(baseSize * 0.7, 12);
        if (textLength > 30) return Math.max(baseSize * 0.85, 14);
        return baseSize;
    };

    // 3. Content length checker
    const getContentHeight = (points) => {
        return points.reduce((total, point) => total + point.length, 0);
    };

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && isPresentationMode) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => {
                    if (prev >= slides?.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 5000);
            setAutoPlayInterval(interval);
            return () => clearInterval(interval);
        } else if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            setAutoPlayInterval(null);
        }
    }, [isPlaying, isPresentationMode, slides?.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (isPresentationMode) {
                if (e.key === 'ArrowRight' || e.key === ' ') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'Escape') {
                    exitPresentationMode();
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPresentationMode, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides?.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    };

    const startPresentation = () => {
        setIsPresentationMode(true);
        setCurrentSlide(0);
        setShowMobileMenu(false);
    };

    const exitPresentationMode = () => {
        setIsPresentationMode(false);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const startEditing = () => {
        setIsEditing(true);
        const slideToEdit = {
            ...slides[currentSlide],
            design: {
                ...slides[currentSlide].design,
                textColor: slides[currentSlide].design?.textColor || '#000000' // Ensure textColor exists
            }
        };
        setEditingSlide(slideToEdit);
        setShowMobileMenu(false);
    };
    const saveEdit = async () => {
        const updatedSlides = slides.map((slide, index) => {
            if (index === currentSlide) {
                // Create a deep copy of the editing slide to avoid reference issues
                return {
                    ...editingSlide,
                    design: {
                        ...editingSlide.design,
                        textColor: editingSlide.design.textColor || '#000000' // Ensure textColor always has a value
                    }
                };
            }
            return slide; // Keep other slides unchanged
        });

        setSlides(updatedSlides);
        setIsEditing(false);
        setEditingSlide(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/ppt/edit/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ slides: updatedSlides }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to save slide edit to backend');
            }

            const data = await res.json();
            console.log('Slide saved to backend:', data.updated.slides);
            // Only update if the backend returns different data
            if (JSON.stringify(data.updated.slides) !== JSON.stringify(updatedSlides)) {
                setSlides(data.updated.slides);
            }
        } catch (err) {
            console.error('Error saving slide edit:', err.message);
        }
    };




    const cancelEdit = () => {
        setIsEditing(false);
        setEditingSlide(null);
    };

    const addSlide = async () => {
        const newSlide = {
            id: Date.now(), // Use timestamp for unique ID
            title: "New Slide",
            points: ["Point 1", "Point 2", "Point 3"],
            notes: "Add your notes here.",
            imageUrl: "",
            tags: ["new"],
            isEditable: true,
            design: {
                backgroundColor: "#ffffff",
                textColor: "#000000", // Explicit default color
                layout: "title-and-subtitle",
                background: "bg1"
            }
        };

        const updatedSlides = [...slides, newSlide];
        setSlides(updatedSlides);
        setCurrentSlide(slides.length);
        setShowMobileMenu(false);

        // Save to backend
        try {
            const res = await fetch(`${API_BASE_URL}/api/ppt/edit/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ slides: updatedSlides }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add slide to backend');
            }

            const data = await res.json();
            console.log('New slide added to backend:', data.updated.slides);
        } catch (err) {
            console.error('Error adding slide to backend:', err.message);
        }
    };


    const deleteSlide = async () => {
        if (slides?.length > 1) {
            const updatedSlides = slides.filter((_, index) => index !== currentSlide);
            const newCurrentSlide = Math.max(0, currentSlide - 1);

            setSlides(updatedSlides);
            setCurrentSlide(newCurrentSlide);

            try {
                const res = await fetch(`${API_BASE_URL}/api/ppt/edit/${projectId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ slides: updatedSlides }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to delete slide on backend');
                }

                const data = await res.json();
                console.log('Slide deleted and updated in backend:', data.updated.slides);
                setSlides(data.updated.slides); // Optional: re-sync with backend
            } catch (err) {
                console.error('Error deleting slide from backend:', err.message);
            }
        }
    };

    const getBackgroundStyle = (backgroundKey, textColor) => {
        const bg = backgrounds[backgroundKey];

        const isImage = bg.startsWith('data:') || /\.(svg|png|jpe?g|webp)$/i.test(bg);

        return {
            background: isImage ? `url(${bg})` : bg,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: textColor
        };
    };

    if (loading) return (
        <div
            style={{
                fontFamily: '"Manrope", sans-serif'
            }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                {/* Loading spinner */}
                <div className="relative mb-8">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                </div>

                {/* Main message */}
                <p className="text-2xl font-semibold text-gray-800 mb-4">
                    We're getting your pitch deck ready
                </p>

                {/* Subtitle */}
                <p className="text-gray-600 text-lg mb-8">
                    Just a moment while we prepare everything for you...
                </p>

                {/* Loading dots animation */}
                <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );



    // PNG Export functionality
    const exportSlideAsPNG = async (slideIndex) => {
        const slide = slides[slideIndex];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size (16:9 aspect ratio)
        canvas.width = 1920;
        canvas.height = 1080;

        // Create a temporary div to render the slide
        const tempDiv = document.createElement('div');
        tempDiv.style.width = '1920px';
        tempDiv.style.height = '1080px';
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '-9999px';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);

        // Render slide content
        const bgStyle = backgrounds[slide.design.background];
        if (bgStyle.endsWith('.svg') || bgStyle.includes('svg+xml')
        ) {
            // Handle SVG background
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                renderSlideText(ctx, slide);
                downloadCanvas(canvas, `slide-${slideIndex + 1}-${slide.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`);
            };
            img.src = bgStyle;
        } else {
            // Handle gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            // Parse gradient (simplified)
            if (bgStyle.includes('#667eea')) {
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
            } else if (bgStyle.includes('#f093fb')) {
                gradient.addColorStop(0, '#f093fb');
                gradient.addColorStop(1, '#f5576c');
            } else if (bgStyle.includes('#4facfe')) {
                gradient.addColorStop(0, '#4facfe');
                gradient.addColorStop(1, '#00f2fe');
            } else if (bgStyle.includes('#43e97b')) {
                gradient.addColorStop(0, '#43e97b');
                gradient.addColorStop(1, '#38f9d7');
            } else if (bgStyle.includes('#fa709a')) {
                gradient.addColorStop(0, '#fa709a');
                gradient.addColorStop(1, '#fee140');
            } else if (bgStyle.includes('#30cfd0')) {
                gradient.addColorStop(0, '#30cfd0');
                gradient.addColorStop(1, '#91a7ff');
            } else if (bgStyle.includes('#a8edea')) {
                gradient.addColorStop(0, '#a8edea');
                gradient.addColorStop(1, '#fed6e3');
            } else {
                gradient.addColorStop(0, '#ff9a9e');
                gradient.addColorStop(1, '#fecfef');
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            renderSlideText(ctx, slide);
            downloadCanvas(canvas, `slide-${slideIndex + 1}-${slide.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`);
        }

        document.body.removeChild(tempDiv);
    };

    const renderSlideText = (ctx, slide) => {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(slide.title, canvas.width / 2, 200);

        ctx.font = '40px Arial';
        slide.points.forEach((point, index) => {
            ctx.fillText(point, canvas.width / 2, 350 + (index * 80));
        });
    };

    const downloadCanvas = (canvas, filename) => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL();
        link.click();
    };

    const exportAllSlides = async () => {
        for (let i = 0; i < slides?.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between exports
            await exportSlideAsPNG(i);
        }
    };

    const exportPresentation = () => {
        if (isMobile) {
            // On mobile, just export as JSON for now
            const presentation = {
                title: "Presentation Export",
                slides: slides,
                exportDate: new Date().toISOString(),
                totalSlides: slides?.length
            };

            const dataStr = JSON.stringify(presentation, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = 'presentation.json';
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        } else {
            exportAllSlides();
        }
        setShowMobileMenu(false);
    };

    const updateEditingSlide = (field, value) => {
        setEditingSlide(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isImageBackground = (bg) => {
        return bg && typeof bg === 'string' && (
            bg.startsWith('data:') ||
            bg.startsWith('http') ||
            bg.startsWith('/') ||
            bg.startsWith('blob:') ||
            /\.(svg|png|jpe?g|webp)$/i.test(bg)
        );
    };

    const updateEditingSlideDesign = (property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                [property]: value,
                // FIXED: Clear conflicting background properties
                ...(property === 'backgroundColor' && {
                    background: undefined, // Clear the old background property
                    backgroundGradient: undefined,
                    backgroundImage: undefined
                }),
                ...(property === 'backgroundGradient' && {
                    background: undefined,
                    backgroundColor: undefined,
                    backgroundImage: undefined
                }),
                ...(property === 'backgroundImage' && {
                    background: undefined,
                    backgroundColor: undefined,
                    backgroundGradient: undefined
                })
            }
        }));
    };

    const updatePoint = (index, value) => {
        const newPoints = [...editingSlide.points];
        newPoints[index] = value;
        updateEditingSlide('points', newPoints);
    };

    const addPoint = () => {
        updateEditingSlide('points', [...editingSlide.points, 'New point']);
    };

    const removePoint = (index) => {
        const newPoints = editingSlide.points.filter((_, i) => i !== index);
        updateEditingSlide('points', newPoints);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Convert to base64 for storage
            const reader = new FileReader();
            reader.onload = (e) => {
                updateEditingSlide('imageUrl', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    if (isPresentationMode) {
        return (
            <div
                style={{
                    fontFamily: '"Manrope", sans-serif'
                }}
                className="fixed inset-0 bg-white z-50 flex flex-col">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={togglePlay}
                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                    >
                        {isPlaying ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={exitPresentationMode}
                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 relative">
                    <div className="h-full w-full">
                        <RenderSlideContent slide={slides[currentSlide]} />
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                        disabled={currentSlide === slides?.length - 1}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="bg-black bg-opacity-50 text-white p-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                        <span>{currentSlide + 1} / {slides?.length}</span>
                        <div className="flex gap-1">
                            {slides?.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isNotGenerated) {
        return (
            <div

                style={{ fontFamily: '"Manrope", sans-serif' }}
                className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm min-h-64">
                <div className="flex flex-col items-center text-center max-w-md">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
                        <FileX className="relative w-20 h-20 text-gray-400" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        No PowerPoint Available
                    </h3>

                    <p className="text-gray-600 text-center mb-8 leading-relaxed">
                        Create a professional presentation from your project data.
                        We'll generate slides with smart layouts and design automatically.
                    </p>

                    {/* Error Display */}
                    {errorDisplay && (
                        <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
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
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:cursor-not-allowed min-w-36"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Generate PowerPoint
                            </>
                        )}
                    </button>

                    {/* Help Text */}
                    <p className="text-xs text-gray-500 mt-4">
                        This will create 8-16 professional slides based on your project summary
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div
                style={{ fontFamily: '"Manrope", sans-serif' }}
                className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-[#193FAE] px-3 sm:px-4 md:px-6 py-2 text-white text-sm sm:text-base rounded-3xl shadow-md hover:bg-[#162E8D] transition flex-shrink-0"
                            >
                                Back
                            </button>
                            <div className="flex items-center gap-2">
                                <p className="text-xl md:text-2xl font-bold text-gray-800">PowerPoint Presentation</p>
                                <span className="text-sm text-gray-500 hidden sm:inline">
                                    Slide {currentSlide + 1} of {slides?.length}
                                </span>
                            </div>
                        </div>

                        {isMobile ? (
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={startEditing}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={addSlide}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Slide
                                </button>
                                <button
                                    onClick={startPresentation}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    Present
                                </button>
                                {/* <button
                    onClick={exportPresentation}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button> */}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    {showMobileMenu && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
                            <button
                                onClick={startEditing}
                                className="w-full flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Slide
                            </button>
                            <button
                                onClick={addSlide}
                                className="w-full flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Slide
                            </button>
                            <button
                                onClick={startPresentation}
                                className="w-full flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                            >
                                <Play className="w-4 h-4" />
                                Start Presentation
                            </button>
                            {/* <button
                onClick={exportPresentation}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
                <Download className="w-4 h-4" />
                Export
            </button> */}
                        </div>
                    )}
                </header>

                <div className="flex-1 flex flex-col md:flex-row">
                    {/* Sidebar - Slide Thumbnails */}
                    <div className={`${isMobile ? 'w-full' : 'w-64'} bg-white border-r overflow-y-auto ${isMobile && !showSidebar ? 'hidden' : ''}`}>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-800">Slides</h2>
                                {isMobile && (
                                    <button
                                        onClick={() => setShowSidebar(false)}
                                        className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="space-y-2">
                                {slides?.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        onClick={() => {
                                            setCurrentSlide(index);
                                            if (isMobile) setShowSidebar(false);
                                        }}
                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${index === currentSlide
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-sm font-medium text-gray-800 mb-1">
                                            {index + 1}. {slide.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {slide.points.length} points
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Slide View */}
                        <div className="flex-1 p-4 md:p-8">
                            <div className="max-w-4xl mx-auto">
                                <div
                                    ref={slideRef}
                                    className="aspect-video bg-white rounded-lg shadow-lg overflow-hidden"
                                    style={{
                                        minHeight: isMobile ? '200px' : '400px',
                                        maxHeight: isMobile ? '300px' : 'none'
                                    }}
                                >
                                    <RenderSlideContent slide={slides[currentSlide]} />
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={prevSlide}
                                        disabled={currentSlide === 0}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setShowNotes(!showNotes)}
                                            className={`p-2 rounded-lg transition-colors ${showNotes
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {showNotes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>

                                        <button
                                            onClick={deleteSlide}
                                            disabled={slides?.length <= 1}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={nextSlide}
                                        disabled={currentSlide === slides?.length - 1}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {showNotes && (
                            <div className="bg-gray-50 border-t p-4 md:p-6">
                                <div className="max-w-4xl mx-auto">
                                    <h3 className="font-semibold text-gray-800 mb-2">Speaker Notes</h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {slides[currentSlide].notes}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Slide Selector */}
                {isMobile && !showSidebar && (
                    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowSidebar(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm"
                            >
                                <Layout className="w-4 h-4" />
                                Slides
                            </button>
                            <div className="text-sm text-gray-600">
                                {currentSlide + 1} / {slides?.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditing && editingSlide && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Edit Slide</h2>
                                    <button
                                        onClick={cancelEdit}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Edit Form */}
                                    <div className="space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={editingSlide.title}
                                                onChange={(e) => updateEditingSlide('title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Content Points */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Content Points
                                            </label>
                                            <div className="space-y-2">
                                                {editingSlide.points.map((point, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={point}
                                                            onChange={(e) => updatePoint(index, e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <button
                                                            onClick={() => removePoint(index)}
                                                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={addPoint}
                                                className="mt-2 flex items-center gap-2 px-3 py-2 text-blue-500 hover:text-blue-700 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Point
                                            </button>
                                        </div>

                                        {/* Layout */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Layout
                                            </label>
                                            <select
                                                value={editingSlide.design.layout}
                                                onChange={(e) => updateEditingSlideDesign('layout', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {layouts.map(layout => (
                                                    <option key={layout.key} value={layout.key}>
                                                        {layout.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Theme */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Theme
                                            </label>
                                            <select
                                                value={editingSlide.design.theme}
                                                onChange={(e) => updateEditingSlideDesign('theme', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {themes.map(theme => (
                                                    <option key={theme.key} value={theme.key}>
                                                        {theme.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Background */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Background
                                            </label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {Object.entries(backgrounds).map(([key, bg]) => {
                                                    const isImage = typeof bg === 'string' && /\.(svg|png|jpe?g|webp)$/i.test(bg);
                                                    return (
                                                        <button
                                                            key={key}
                                                            onClick={() => updateEditingSlideDesign('backgroundColor', key)}
                                                            className={`w-full h-12 rounded-lg border-2 transition-all ${editingSlide.design.backgroundColor === key
                                                                ? 'border-blue-500 ring-2 ring-blue-200'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                                }`}
                                                            style={{
                                                                background: isImage ? `url(${bg})` : bg,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                backgroundRepeat: 'no-repeat',
                                                            }}
                                                            title={key}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>


                                        {/* Text Color */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Text Color
                                            </label>
                                            <div className="grid grid-cols-8 gap-2">
                                                {[
                                                    '#ffffff', '#000000', '#1f2937', '#6b7280',
                                                    '#ef4444', '#f59e0b', '#eab308', '#22c55e',
                                                    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
                                                    '#ec4899', '#f43f5e', '#10b981', '#84cc16'
                                                ].map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => updateEditingSlideDesign('textColor', color)}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all ${editingSlide.design.textColor === color
                                                            ? 'border-gray-800 ring-2 ring-blue-500'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                            }`}
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>

                                            {/* Custom color input */}
                                            <div className="mt-3">
                                                <label className="block text-xs text-gray-500 mb-1">
                                                    Custom Color
                                                </label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="color"
                                                        value={editingSlide.design.textColor}
                                                        onChange={(e) => updateEditingSlideDesign('textColor', e.target.value)}
                                                        className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editingSlide.design.textColor}
                                                        onChange={(e) => updateEditingSlideDesign('textColor', e.target.value)}
                                                        placeholder="#ffffff"
                                                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slide Image */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Slide Image
                                            </label>
                                            <div className="space-y-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />

                                                {editingSlide.imageUrl && (
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={editingSlide.imageUrl}
                                                            alt="Current slide image"
                                                            className="max-w-48 max-h-32 object-contain rounded-lg border"
                                                        />
                                                        <button
                                                            onClick={() => updateEditingSlide('imageUrl', '')}
                                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Speaker Notes */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Speaker Notes
                                            </label>
                                            <textarea
                                                value={editingSlide.notes}
                                                onChange={(e) => updateEditingSlide('notes', e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Add your speaker notes here..."
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tags
                                            </label>
                                            <input
                                                type="text"
                                                value={editingSlide.tags.join(', ')}
                                                onChange={(e) => updateEditingSlide('tags', e.target.value.split(', ').filter(tag => tag.trim()))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="presentation, business, marketing"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preview
                                        </label>
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                                            <RenderSlideContent slide={editingSlide} />
                                        </div>

                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={cancelEdit}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveEdit}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    // <EnhancedSlideEditor editingSlide={editingSlide} setEditingSlide={setEditingSlide} />
                )}
            </div>
        </>
    );
};

export default PowerPointPresentation;