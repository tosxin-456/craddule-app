import React, { useState } from 'react'
import { useMemo } from "react";
import bg1 from '../../src/images/power point bg/Wrapper1.png';
import bg2 from '../../src/images/power point bg/Wrapper2.png';
import bg3 from '../../src/images/power point bg/Wrapper3.png';
import { ChevronLeft, ChevronRight, Edit3, Save, Download, Plus, Trash2, Image, Type, Palette, Layout, Eye, EyeOff, Play, Square, Maximize2, MoreVertical, FileText, Clock, Menu, X, FileX, AlertCircle, Loader2, Quote } from 'lucide-react';

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

const RenderSlideContent = ({ slide }) => {
    console.log(slide)
    const {
        layout,
        background,
        textColor,
        backgroundColor,
        backgroundGradient,
        backgroundImage,
        backgroundOpacity,
        titleFont,
        bodyFont,
        padding,
        margin,
        alignment,
        border,
        shadow,
        animation,
        theme,
        brandColors,
        bulletStyle,
        customBulletIcon,
        lineHeight,
        letterSpacing,
        opacity,
        transform,
        gridProperties,
        customCSS,
        totalContentLength,
        responsive,
    } = slide?.design ?? {};

    const [editingSlide, setEditingSlide] = useState(null);

    // Enhanced color resolution with brand colors
    const resolveColor = (color, fallback = '#000000') => {
        if (color && color.trim()) return color;
        if (brandColors?.primary && !color) return brandColors.primary;
        return fallback;
    };

    const slideTextColor = resolveColor(textColor, brandColors?.primary || '#000000');
    const titleColor = resolveColor(titleFont?.color, brandColors?.primary || slideTextColor);
    const bodyColor = resolveColor(bodyFont?.color, brandColors?.secondary || slideTextColor);

    // Enhanced background resolution with better priority logic
    const resolveBackgroundValue = () => {
        // Priority: backgroundGradient > backgroundImage > backgroundColor > background > brand colors
        if (backgroundGradient?.trim()) return backgroundGradient;
        if (backgroundImage?.trim()) return backgroundImage;
        if (backgroundColor && backgrounds?.[backgroundColor]) return backgrounds[backgroundColor];
        if (backgroundColor?.trim()) return backgroundColor;
        if (background && backgrounds?.[background]) return backgrounds[background];
        if (background?.trim()) return background;
        if (brandColors?.accent) return brandColors.accent;
        return 'transparent';
    };

    // Optimized content length calculations
    // const totalContentLength = useMemo(() =>
    //     (slide?.points?.join('').length || 0) + (slide?.title?.length || 0),
    //     [slide?.points, slide?.title]
    // );

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

    const bgValue = resolveBackgroundValue();
    const isImage = isImageBackground(bgValue);

    const isContentLong = totalContentLength > 300;
    const hasLongTitle = (slide?.title?.length || 0) > 50;
    const hasLongPoints = slide?.points?.some(point => (point?.length || 0) > 80) || false;

    // Enhanced responsive breakpoint detection
    const getResponsiveValues = () => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        if (isMobile && responsive?.mobile) {
            return {
                fontSize: responsive.mobile.fontSize || (bodyFont?.size || 16),
                padding: responsive.mobile.padding || (padding?.top || 20)
            };
        }

        if (isTablet && responsive?.tablet) {
            return {
                fontSize: responsive.tablet.fontSize || (bodyFont?.size || 16),
                padding: responsive.tablet.padding || (padding?.top || 20)
            };
        }

        return {
            fontSize: bodyFont?.size || 16,
            padding: padding?.top || 20
        };
    };

    // Enhanced background style building with error handling
    const buildBackgroundStyle = () => {
        const style = {};

        try {
            if (backgroundGradient?.trim()) {
                style.background = backgroundGradient;
            } else if (backgroundImage?.trim()) {
                style.backgroundImage = `url(${backgroundImage})`;
                style.backgroundSize = 'cover';
                style.backgroundPosition = 'center';
                style.backgroundRepeat = 'no-repeat';
            } else if (isImage && bgValue !== 'transparent') {
                style.backgroundImage = `url(${bgValue})`;
                style.backgroundSize = 'cover';
                style.backgroundPosition = 'center';
                style.backgroundRepeat = 'no-repeat';
            } else if (bgValue && bgValue !== 'transparent') {
                style.backgroundColor = bgValue;
            }

            // Enhanced opacity handling with overlay support
            if (backgroundOpacity && backgroundOpacity !== 1 && backgroundOpacity > 0) {
                if (style.backgroundColor) {
                    style.backgroundColor = convertToRgba(style.backgroundColor, backgroundOpacity);
                } else if (style.backgroundImage) {
                    // Add overlay for image backgrounds
                    style.position = 'relative';
                }
            }
        } catch (error) {
            console.warn('Error building background style:', error);
        }

        return style;
    };

    // Utility function for color conversion
    const convertToRgba = (color, opacity) => {
        if (!color || opacity === undefined) return color;

        // Handle hex colors
        if (color.startsWith('#')) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            if (result) {
                return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`;
            }
        }

        // Handle rgb/rgba colors
        if (color.startsWith('rgb')) {
            const rgbMatch = color.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
                return `rgba(${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}, ${opacity})`;
            }
        }

        return color;
    };

    // Enhanced slide style building with comprehensive property support
    const buildSlideStyle = () => {
        const bgStyle = buildBackgroundStyle();
        const responsiveValues = getResponsiveValues();

        return {
            ...bgStyle,
            color: slideTextColor,
            opacity: opacity || 1,
            padding: padding ?
                `${padding.top || 0}px ${padding.right || 0}px ${padding.bottom || 0}px ${padding.left || 0}px` :
                `${responsiveValues.padding}px`,
            margin: margin ?
                `${margin.top || 0}px ${margin.right || 0}px ${margin.bottom || 0}px ${margin.left || 0}px` :
                undefined,
            borderWidth: border?.width || 0,
            borderStyle: border?.style || 'none',
            borderColor: border?.color || '#000000',
            borderRadius: `${border?.radius || 0}px`,
            boxShadow: shadow?.enabled ?
                `${shadow.x || 0}px ${shadow.y || 0}px ${shadow.blur || 0}px ${shadow.color || 'rgba(0,0,0,0.2)'}`
                : 'none',
            transform: transform ?
                `rotate(${transform.rotate || 0}deg) scale(${transform.scale || 1}) skewX(${transform.skewX || 0}deg) skewY(${transform.skewY || 0}deg)`
                : undefined,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
            lineHeight: lineHeight || 1.5,
            textAlign: alignment?.horizontal || 'left',
            alignItems: alignment?.vertical === 'middle' ? 'center' :
                alignment?.vertical === 'bottom' ? 'flex-end' : 'flex-start',
            justifyContent: alignment?.horizontal === 'center' ? 'center' :
                alignment?.horizontal === 'right' ? 'flex-end' : 'flex-start'
        };
    };

    // Enhanced font style builders with responsive support
    const buildTitleStyle = () => {
        const responsiveValues = getResponsiveValues();
        return {
            fontFamily: titleFont?.family || 'Arial',
            fontSize: `${titleFont?.size || 24}px`,
            fontWeight: titleFont?.weight || 'bold',
            fontStyle: titleFont?.style || 'normal',
            color: titleColor,
            lineHeight: lineHeight || 1.5,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
        };
    };

    const buildBodyStyle = () => {
        const responsiveValues = getResponsiveValues();
        return {
            fontFamily: bodyFont?.family || 'Arial',
            fontSize: `${responsiveValues.fontSize}px`,
            fontWeight: bodyFont?.weight || 'normal',
            fontStyle: bodyFont?.style || 'normal',
            color: bodyColor,
            lineHeight: lineHeight || 1.5,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
        };
    };

    // Enhanced bullet style handling with custom icons
    const getBulletStyle = () => {
        if (bulletStyle === 'custom' && customBulletIcon) {
            return { listStyleType: 'none' };
        }
        const validBulletTypes = ['disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'];
        return {
            listStyleType: validBulletTypes.includes(bulletStyle) ? bulletStyle : 'disc'
        };
    };

    // Enhanced animation classes with duration and delay support
    const getAnimationClasses = () => {
        if (!animation?.entrance || animation.entrance === 'none') return '';

        const animationMap = {
            'fade-in': 'animate-fadeIn',
            'slide-in-left': 'animate-slideInLeft',
            'slide-in-right': 'animate-slideInRight',
            'slide-in-up': 'animate-slideInUp',
            'slide-in-down': 'animate-slideInDown',
            'zoom-in': 'animate-zoomIn',
            'bounce-in': 'animate-bounceIn',
            'rotate-in': 'animate-rotateIn',
            'flip-in': 'animate-flipIn'
        };

        const baseClass = animationMap[animation.entrance] || '';
        const duration = animation.duration ? `animation-duration-${animation.duration}` : '';
        const delay = animation.delay ? `animation-delay-${animation.delay}` : '';

        return `${baseClass} ${duration} ${delay}`.trim();
    };

    // Enhanced theme classes with brand color integration
    const getThemeClasses = () => {
        const themeMap = {
            'corporate': 'font-sans',
            'creative': 'font-serif',
            'minimal': 'font-light',
            'dark': 'dark-theme',
            'colorful': 'colorful-theme',
            'professional': 'font-medium',
            'academic': 'font-serif',
            'modern': 'font-medium',
            'elegant': 'font-serif'
        };
        return themeMap[theme] || '';
    };

    // Enhanced alignment classes
    const getAlignmentClasses = () => {
        const horizontal = alignment?.horizontal || 'left';
        const vertical = alignment?.vertical || 'top';

        const alignmentMap = {
            'left': 'text-left justify-start items-start',
            'center': 'text-center justify-center items-center',
            'right': 'text-right justify-end items-end'
        };

        const verticalMap = {
            'top': 'items-start',
            'middle': 'items-center',
            'bottom': 'items-end'
        };

        return `${alignmentMap[horizontal] || alignmentMap.left} ${verticalMap[vertical] || verticalMap.top}`;
    };

    const animationClasses = useMemo(() => getAnimationClasses(), [animation]);
    const titleStyle = useMemo(() => buildTitleStyle(), [titleFont, titleColor, lineHeight, letterSpacing]);
    const bodyStyle = useMemo(() => buildBodyStyle(), [bodyFont, bodyColor, lineHeight, letterSpacing, responsive]);
    const themeClasses = useMemo(() => getThemeClasses(), [theme]);
    const alignmentClasses = useMemo(() => getAlignmentClasses(), [alignment]);

    // Enhanced responsive classes with better breakpoint handling
    const getTitleClasses = () => {
        const baseClasses = 'font-bold mb-3 md:mb-8 drop-shadow-lg leading-tight';
        const sizeClasses = hasLongTitle ?
            'text-sm sm:text-lg md:text-2xl' :
            'text-lg sm:text-xl md:text-4xl';
        const spacingClasses = isContentLong ? 'mb-2 md:mb-4' : '';

        return `${baseClasses} ${sizeClasses} ${spacingClasses} ${animationClasses} ${themeClasses} ${alignmentClasses}`.trim();
    };

    const getPointClasses = () => {
        const baseClasses = 'opacity-90 drop-shadow-md leading-relaxed';
        const sizeClasses = hasLongPoints ?
            'text-xs sm:text-sm md:text-lg' :
            'text-sm sm:text-base md:text-2xl';
        const spacingClasses = isContentLong ? 'leading-tight' : '';

        return `${baseClasses} ${sizeClasses} ${spacingClasses} ${themeClasses} ${alignmentClasses}`.trim();
    };

    const titleClasses = getTitleClasses();
    const pointClasses = getPointClasses();

    const slideStyle = useMemo(() => buildSlideStyle(), [
        bgValue, slideTextColor, opacity, padding, margin, border, shadow, transform, letterSpacing, lineHeight, alignment, responsive
    ]);

    // Enhanced custom bullet renderer with icon support
    const renderCustomBullet = () => {
        if (bulletStyle === 'custom' && customBulletIcon) {
            return (
                <span className="w-1.5 h-1.5 md:w-3 md:h-3 flex items-center justify-center mt-1.5 md:mt-2 flex-shrink-0">
                    {typeof customBulletIcon === 'string' ? (
                        <span dangerouslySetInnerHTML={{ __html: customBulletIcon }} />
                    ) : (
                        customBulletIcon
                    )}
                </span>
            );
        }
        return (
            <span
                className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full opacity-90 mt-1.5 md:mt-2 flex-shrink-0"
                style={{ backgroundColor: brandColors?.accent || slideTextColor }}
            />
        );
    };

    // Enhanced grid layout helper with better validation and gap support
    const getGridClasses = () => {
        if (gridProperties?.columns && gridProperties?.rows) {
            const cols = Math.min(Math.max(gridProperties.columns, 1), 12);
            const rows = Math.min(Math.max(gridProperties.rows, 1), 12);
            const gap = gridProperties.gap ? `gap-${Math.min(gridProperties.gap, 96)}` : 'gap-4';
            return `grid-cols-${cols} grid-rows-${rows} ${gap}`;
        }
        return 'gap-4';
    };

    // Enhanced text truncation with better word boundaries
    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text;

        const truncated = text.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        if (lastSpaceIndex > maxLength * 0.8) {
            return truncated.substring(0, lastSpaceIndex) + '...';
        }

        return truncated + '...';
    };

    // Background overlay component for image backgrounds with opacity
    const BackgroundOverlay = () => {
        if (backgroundOpacity && backgroundOpacity !== 1 && backgroundOpacity > 0 && (backgroundImage || isImage)) {
            return (
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${1 - backgroundOpacity})`,
                    }}
                />
            );
        }
        return null;
    };

    // Safe slide property access
    const safeSlideTitle = slide?.title || '';
    const safeSlidePoints = slide?.points || [];

    // Enhanced container classes with theme and brand color support
    const getContainerClasses = () => {
        const baseClasses = 'h-full w-full relative overflow-y-auto';
        const themeSpecificClasses = theme === 'dark' ? 'bg-gray-900 text-white' : '';
        return `${baseClasses} ${themeSpecificClasses} ${animationClasses}`.trim();
    };

    switch (layout) {
        case "title-and-subtitle":
            return (
                <div
                    className={getContainerClasses()}
                    style={{ ...slideStyle, ...(customCSS && { cssText: customCSS }) }}
                >
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <div className="w-full max-w-full min-h-0 flex-1 flex flex-col justify-center">
                            <h1 className={titleClasses} style={titleStyle}>
                                {/* Show full title on mobile, truncate on larger screens */}
                                <span className="block sm:hidden">{safeSlideTitle}</span>
                                <span className="hidden sm:block">{hasLongTitle ? truncateText(safeSlideTitle, 40) : safeSlideTitle}</span>
                            </h1>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 w-full flex-1 min-h-0 overflow-y-auto">
                                {safeSlidePoints.map((point, idx) => (
                                    <p key={idx} className={`${pointClasses} w-full break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                        {/* Show full text on mobile, truncate on larger screens */}
                                        <span className="block sm:hidden">{point}</span>
                                        <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 80) : point}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "bullets-left":
        case "bullets-right":
        case "bullets-center":
            const bulletAlignment = layout === "bullets-center" ? "justify-center items-center" :
                layout === "bullets-right" ? "justify-end items-end" : "justify-start items-start";
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">

                        {/* Title Section - Always visible */}
                        <div className="w-full mb-4 sm:mb-6">
                            <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl`} style={titleStyle}>
                                {hasLongTitle ? truncateText(slide?.title, window.innerWidth < 640 ? 30 : 40) : slide?.title}
                            </h2>
                        </div>

                        {/* Content Section - Responsive Layout */}
                        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 sm:gap-6">

                            {/* Bullets Section */}
                            <div className={`w-full lg:w-2/3 flex flex-col min-h-0 ${bulletAlignment}`}>
                                <div className="flex-1 min-h-0 overflow-y-auto">
                                    <ul
                                        className="space-y-3 sm:space-y-4 md:space-y-5 pb-4"
                                        style={getBulletStyle()}
                                    >
                                        {slide?.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full">
                                                {renderCustomBullet()}
                                                <span
                                                    className={`${pointClasses.replace('opacity-90', '')} flex-1 break-words min-w-0 text-sm sm:text-base md:text-lg leading-relaxed`}
                                                    style={bodyStyle}
                                                >
                                                    {hasLongPoints ? truncateText(point, window.innerWidth < 640 ? 50 : 70) : point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="w-full lg:w-1/3 flex items-center justify-center flex-shrink-0 min-h-48 lg:min-h-0">
                                {slide?.imageUrl ? (
                                    <div className="relative group w-full h-48 sm:h-56 md:h-64 lg:h-full max-w-md lg:max-w-none">
                                        <img
                                            src={slide?.imageUrl}
                                            alt="Slide"
                                            className="w-full h-full object-contain rounded-lg"
                                            style={{
                                                borderRadius: `${border?.radius || 0}px`,
                                                opacity: opacity || 1
                                            }}
                                        />

                                        {/* Desktop hover overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg items-center justify-center hidden lg:flex">
                                            <button
                                                onClick={() => document.getElementById('image-upload-input').click()}
                                                className="text-white bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                            >
                                                Change Image
                                            </button>
                                        </div>

                                        {/* Mobile/Tablet edit button */}
                                        <button
                                            onClick={() => document.getElementById('image-upload-input').click()}
                                            className="absolute top-2 right-2 lg:hidden w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 shadow-lg transition-colors"
                                        >
                                            ✎
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => document.getElementById('image-upload-input').click()}
                                        className="w-full h-48 sm:h-56 md:h-64 lg:h-80 max-w-md lg:max-w-none bg-opacity-20 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all group border-2 border-dashed border-opacity-30"
                                        style={{
                                            backgroundColor: brandColors?.accent || 'rgba(255,255,255,0.2)',
                                            borderColor: brandColors?.accent || 'rgba(255,255,255,0.3)',
                                            borderRadius: `${border?.radius || 8}px`
                                        }}
                                    >
                                        <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-60 group-hover:opacity-80 mb-2 transition-opacity" />
                                        <span className="text-xs sm:text-sm opacity-60 group-hover:opacity-80 text-center px-2 transition-opacity">
                                            Add image
                                        </span>
                                    </button>
                                )}
                            </div>
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
                </div>
            );

        case "three-columns":
            const columnsCount = Math.ceil(slide?.points.length / 3);
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6`} style={titleStyle}>
                            <span className="block sm:hidden">{slide?.title}</span>
                            <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                        </h2>
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${getGridClasses()} gap-3 sm:gap-4 md:gap-6 pb-4`}>
                                {[0, 1, 2].map(colIndex => (
                                    <div key={colIndex} className="space-y-3 sm:space-y-4">
                                        {slide?.points.slice(colIndex * columnsCount, (colIndex + 1) * columnsCount).map((point, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white bg-opacity-20 p-3 sm:p-4 md:p-6 rounded-lg backdrop-blur-sm"
                                                style={{
                                                    backgroundColor: brandColors?.accent ? convertToRgba(brandColors.accent, 0.2) : 'rgba(255,255,255,0.2)',
                                                    borderRadius: `${border?.radius || 8}px`,
                                                    border: border?.width ? `${border.width}px ${border.style} ${border.color}` : 'none'
                                                }}
                                            >
                                                <div className={`${pointClasses} font-medium break-words text-xs sm:text-sm md:text-base leading-relaxed`} style={bodyStyle}>
                                                    <span className="block sm:hidden">{point}</span>
                                                    <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 50) : point}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "contact-layout":
            return (
                <div className={`h-full w-full flex flex-col justify-center p-4 sm:p-6 md:p-12 overflow-y-auto ${animationClasses}`} style={slideStyle}>
                    <p className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center`} style={titleStyle}>
                        <span className="block sm:hidden">{slide?.title}</span>
                        <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                    </p>
                    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pb-4">
                            {slide?.points.map((point, idx) => (
                                <div key={idx} className="bg-white bg-opacity-20 p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-sm text-center">
                                    <div className={`${pointClasses} font-medium break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                        <span className="block sm:hidden">{point}</span>
                                        <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 60) : point}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "stats-highlight":
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <p className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center`} style={titleStyle}>
                        <span className="block sm:hidden">{slide?.title}</span>
                        <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                    </p>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className={`grid ${getGridClasses() || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-3 sm:gap-4 md:gap-8 pb-4`}>
                            {slide?.points.map((point, idx) => (
                                <div key={idx} className="text-center bg-white bg-opacity-20 p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-sm h-fit">
                                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg leading-tight break-words" style={titleStyle}>
                                        {point.split(' ')[0]}
                                    </div>
                                    <div className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 leading-relaxed break-words" style={bodyStyle}>
                                        <span className="block sm:hidden">{point.split(' ').slice(1).join(' ')}</span>
                                        <span className="hidden sm:block">{truncateText(point.split(' ').slice(1).join(' '), 30)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "centered-message":
            return (
                <div className={`h-full w-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-12 overflow-y-auto ${animationClasses}`} style={slideStyle}>
                    <p className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6`} style={titleStyle}>
                        <span className="block sm:hidden">{slide?.title}</span>
                        <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                    </p>
                    <div className="flex-1 w-full max-w-full sm:max-w-lg md:max-w-2xl min-h-0 overflow-y-auto">
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-4">
                            {slide?.points.map((point, idx) => (
                                <div key={idx} className={`${pointClasses} font-medium bg-white bg-opacity-20 p-3 sm:p-4 md:p-5 rounded-lg backdrop-blur-sm break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                    <span className="block sm:hidden">{point}</span>
                                    <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 100) : point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "icon-and-bullets":
            return (
                <div className={`h-full w-full flex flex-col justify-center p-4 sm:p-6 md:p-12 overflow-y-auto ${animationClasses}`} style={slideStyle}>
                    <p className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center`} style={titleStyle}>
                        <span className="block sm:hidden">{slide?.title}</span>
                        <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                    </p>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 max-w-full sm:max-w-lg md:max-w-2xl mx-auto pb-4">
                            {slide?.points.map((point, idx) => (
                                <div key={idx} className="flex items-start bg-white bg-opacity-20 p-3 sm:p-4 md:p-5 rounded-lg backdrop-blur-sm gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base md:text-lg font-bold">{idx + 1}</span>
                                    </div>
                                    <div className={`${pointClasses} font-medium flex-1 break-words min-w-0 text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                        <span className="block sm:hidden">{point}</span>
                                        <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 80) : point}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "timeline":
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <p className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center p-4 sm:p-6 md:p-12 pb-0`} style={titleStyle}>
                        {slide?.title}
                    </p>
                    <div className="flex-1 relative min-h-0 px-4 sm:px-6 md:px-12 overflow-y-auto">
                        <div className="relative pb-4">
                            <div className="min-h-full py-4">
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 md:w-1 bg-white opacity-50"
                                    style={{ height: 'calc(100% - 2rem)', top: '1rem' }}></div>
                                <div className="space-y-6 sm:space-y-8 relative">
                                    {slide?.points.map((point, idx) => (
                                        <div key={idx} className={`flex items-start ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border-2 border-white shadow-lg z-10 mt-2"></div>
                                            <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-4 sm:pr-6 md:pr-8' : 'text-left pl-4 sm:pl-6 md:pl-8'}`}>
                                                <div className="bg-white bg-opacity-20 p-3 sm:p-4 md:p-5 rounded-lg backdrop-blur-sm">
                                                    <div className={`${pointClasses} font-medium break-words whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed`} style={bodyStyle}>
                                                        {point}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "image-left-text-right":
        case "image-right-text-left":
            const imageFirst = layout === "image-left-text-right";
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col md:flex-row p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <div className="w-full lg:w-1/3 flex items-center justify-center flex-shrink-0 min-h-48 lg:min-h-0">
                            {slide?.imageUrl ? (
                                <div className="relative group w-full h-48 sm:h-56 md:h-64 lg:h-full max-w-md lg:max-w-none">
                                    <img
                                        src={slide?.imageUrl}
                                        alt="Slide"
                                        className="w-full h-full object-contain rounded-lg"
                                        style={{
                                            borderRadius: `${border?.radius || 0}px`,
                                            opacity: opacity || 1
                                        }}
                                    />

                                    {/* Desktop hover overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg items-center justify-center hidden lg:flex">
                                        <button
                                            onClick={() => document.getElementById('image-upload-input').click()}
                                            className="text-white bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            Change Image
                                        </button>
                                    </div>

                                    {/* Mobile/Tablet edit button */}
                                    <button
                                        onClick={() => document.getElementById('image-upload-input').click()}
                                        className="absolute top-2 right-2 lg:hidden w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 shadow-lg transition-colors"
                                    >
                                        ✎
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => document.getElementById('image-upload-input').click()}
                                    className="w-full h-48 sm:h-56 md:h-64 lg:h-80 max-w-md lg:max-w-none bg-opacity-20 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all group border-2 border-dashed border-opacity-30"
                                    style={{
                                        backgroundColor: brandColors?.accent || 'rgba(255,255,255,0.2)',
                                        borderColor: brandColors?.accent || 'rgba(255,255,255,0.3)',
                                        borderRadius: `${border?.radius || 8}px`
                                    }}
                                >
                                    <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-60 group-hover:opacity-80 mb-2 transition-opacity" />
                                    <span className="text-xs sm:text-sm opacity-60 group-hover:opacity-80 text-center px-2 transition-opacity">
                                        Add image
                                    </span>
                                </button>
                            )}
                        </div>
                        <div className={`flex-1 ${imageFirst ? 'md:order-2' : 'md:order-1'} flex flex-col justify-center p-2 md:p-4 overflow-y-auto`}>
                            <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4`} style={titleStyle}>
                                <span className="block sm:hidden">{slide?.title}</span>
                                <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                            </h2>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-4">
                                {slide?.points.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                        {renderCustomBullet()}
                                        <p className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                            <span className="block sm:hidden">{point}</span>
                                            <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 80) : point}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <input
                        id="image-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            );

        case "image-only":
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-12 overflow-y-auto">
                        {slide?.title && (
                            <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8 text-center`} style={titleStyle}>
                                <span className="block sm:hidden">{slide?.title}</span>
                                <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                            </h2>
                        )}
                        <div className="flex-1 flex items-center justify-center">
                            {slide?.imageUrl ? (
                                <div className="relative group w-full h-full max-w-4xl max-h-full">
                                    <img
                                        src={slide?.imageUrl}
                                        alt="Slide"
                                        className="w-full h-full object-contain rounded-lg"
                                        style={{
                                            borderRadius: `${border?.radius || 8}px`,
                                            opacity: opacity || 1
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg items-center justify-center hidden md:flex">
                                        <button
                                            onClick={() => document.getElementById('image-upload-input').click()}
                                            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => document.getElementById('image-upload-input').click()}
                                    className="w-full h-48 sm:h-64 md:h-96 bg-opacity-20 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all group"
                                    style={{
                                        backgroundColor: brandColors?.accent || 'rgba(255,255,255,0.2)',
                                        borderRadius: `${border?.radius || 8}px`
                                    }}
                                >
                                    <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 opacity-60 group-hover:opacity-80 mb-2 md:mb-4" />
                                    <span className="text-sm sm:text-base md:text-lg opacity-60 group-hover:opacity-80">
                                        Add image
                                    </span>
                                </button>
                            )}
                        </div>
                        <input
                            id="image-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>
            );

        case "two-columns":
            const halfPoints = Math.ceil(slide?.points.length / 2);
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6`} style={titleStyle}>
                            <span className="block sm:hidden">{slide?.title}</span>
                            <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 40) : slide?.title}</span>
                        </h2>
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridClasses()} gap-4 md:gap-6 pb-4`}>
                                <div className="space-y-3 sm:space-y-4 md:space-y-6 md:pr-4">
                                    {slide?.points.slice(0, halfPoints).map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                            {renderCustomBullet()}
                                            <span className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                                <span className="block sm:hidden">{point}</span>
                                                <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 60) : point}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 sm:space-y-4 md:space-y-6 md:pl-4">
                                    {slide?.points.slice(halfPoints).map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                            {renderCustomBullet()}
                                            <span className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                                <span className="block sm:hidden">{point}</span>
                                                <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 60) : point}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "quote-layout":
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <div className="max-w-full sm:max-w-2xl md:max-w-4xl">
                            <div className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl m-auto opacity-30 mb-3 md:mb-4" style={{ color: brandColors?.accent || slideTextColor }}>
                                <Quote />
                            </div>
                            <blockquote className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-4xl font-light italic mb-4 md:mb-8 leading-relaxed`} style={titleStyle}>
                                <span className="block sm:hidden">{slide?.title}</span>
                                <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 80) : slide?.title}</span>
                            </blockquote>
                            {slide?.points && slide?.points.length > 0 && (
                                <cite className={`${pointClasses} text-sm sm:text-base md:text-lg lg:text-xl opacity-80`} style={bodyStyle}>
                                    — <span className="block sm:hidden">{slide?.points[0]}</span>
                                    <span className="hidden sm:block">{hasLongPoints ? truncateText(slide?.points[0], 60) : slide?.points[0]}</span>
                                </cite>
                            )}
                        </div>
                    </div>
                </div>
            );

        case "comparison-layout":
            const leftPoints = slide?.points.filter((_, idx) => idx % 2 === 0) || [];
            const rightPoints = slide?.points.filter((_, idx) => idx % 2 === 1) || [];
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6`} style={titleStyle}>
                            <span className="block sm:hidden">{slide?.title}</span>
                            <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 60) : slide?.title}</span>
                        </h2>
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridClasses()} gap-4 md:gap-6 h-full pb-4`}>
                                <div className="bg-white bg-opacity-10 p-3 sm:p-4 md:p-6 rounded-lg backdrop-blur-sm">
                                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                        {leftPoints.map((point, idx) => (
                                            <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                                {renderCustomBullet()}
                                                <span className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                                    <span className="block sm:hidden">{point}</span>
                                                    <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 60) : point}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-10 p-3 sm:p-4 md:p-6 rounded-lg backdrop-blur-sm">
                                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                        {rightPoints.map((point, idx) => (
                                            <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                                {renderCustomBullet()}
                                                <span className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                                    <span className="block sm:hidden">{point}</span>
                                                    <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 60) : point}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "full-image-background":
            return (
                <div
                    className={getContainerClasses()}
                    style={{
                        ...slideStyle,
                        backgroundImage: slide?.imageUrl ? `url(${slide?.imageUrl})` : slideStyle.backgroundImage,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <div className="max-w-full sm:max-w-2xl md:max-w-4xl">
                            <h1 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-4xl text-white drop-shadow-2xl mb-4 md:mb-6`} style={{ ...titleStyle, color: 'white' }}>
                                <span className="block sm:hidden">{slide?.title}</span>
                                <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 60) : slide?.title}</span>
                            </h1>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-4">
                                {slide?.points.map((point, idx) => (
                                    <p key={idx} className={`${pointClasses} text-white drop-shadow-lg break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={{ ...bodyStyle, color: 'white' }}>
                                        <span className="block sm:hidden">{point}</span>
                                        <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 120) : point}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            // Default layout (similar to title-and-subtitle)
            return (
                <div className={getContainerClasses()} style={slideStyle}>
                    <BackgroundOverlay />
                    <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
                        <h2 className={`${titleClasses} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6`} style={titleStyle}>
                            <span className="block sm:hidden">{slide?.title}</span>
                            <span className="hidden sm:block">{hasLongTitle ? truncateText(slide?.title, 60) : slide?.title}</span>
                        </h2>
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-4">
                            {slide?.points.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                    {renderCustomBullet()}
                                    <p className={`${pointClasses} flex-1 break-words text-sm sm:text-base md:text-lg leading-relaxed`} style={bodyStyle}>
                                        <span className="block sm:hidden">{point}</span>
                                        <span className="hidden sm:block">{hasLongPoints ? truncateText(point, 120) : point}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
    }
};

export default RenderSlideContent;