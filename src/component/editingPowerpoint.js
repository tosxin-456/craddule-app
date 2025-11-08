import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Type, Palette, Zap, Icon as IconIcon, Move, RotateCcw, Eye, EyeOff } from 'lucide-react';

const EnhancedSlideEditor = ({ editingSlide, setEditingSlide }) => {
    // Sample data based on your structure
    // const [editingSlide, setEditingSlide] = useState({
    //     title: "Introduction & Vision",
    //     points: [
    //         "The future of public health access relies on technological progression.",
    //         "Healthcare disparities persist due to various barriers like geography and resources.",
    //         "Company aims to redefine healthcare access through digital technology.",
    //         "Vision: Provide high-standard healthcare to all leveraging modern tech."
    //     ],
    //     design: {
    //         layout: "image-background-text-overlay",
    //         theme: "academic",
    //         backgroundColor: "bg11",
    //         textColor: "#000000",
    //         titleFont: {
    //             family: "Arial",
    //             size: 24,
    //             weight: "bold",
    //             style: "normal",
    //             color: ""
    //         },
    //         bodyFont: {
    //             family: "Arial",
    //             size: 16,
    //             weight: "normal",
    //             style: "normal",
    //             color: ""
    //         },
    //         animation: {
    //             entrance: "none",
    //             duration: 500,
    //             delay: 0
    //         },
    //         alignment: {
    //             horizontal: 'left',
    //             vertical: 'top'
    //         },
    //         bulletStyle: "disc",
    //         customBulletIcon: "",
    //         lineHeight: 1.5,
    //         letterSpacing: 0,
    //         padding: { top: 20, right: 20, bottom: 20, left: 20 },
    //         margin: { top: 0, right: 0, bottom: 0, left: 0 },
    //         border: {
    //             width: 0,
    //             style: "none",
    //             color: "#000000",
    //             radius: 0
    //         },
    //         shadow: {
    //             enabled: false,
    //             x: 0,
    //             y: 2,
    //             blur: 4,
    //             color: "rgba(0,0,0,0.1)"
    //         },
    //         transform: {
    //             rotate: 0,
    //             scale: 1,
    //             skewX: 0,
    //             skewY: 0
    //         }
    //     },
    //     imageUrl: "",
    //     notes: "",
    //     tags: []
    // });

    const [activeTab, setActiveTab] = useState('content');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Font families
    const fontFamilies = [
        'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Tahoma',
        'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Courier New', 'Palatino',
        'Garamond', 'Bookman', 'Arial Black', 'Lucida Console'
    ];

    // Animation options
    const animations = [
        { key: 'none', name: 'None' },
        { key: 'fadeIn', name: 'Fade In' },
        { key: 'slideInLeft', name: 'Slide In Left' },
        { key: 'slideInRight', name: 'Slide In Right' },
        { key: 'slideInUp', name: 'Slide In Up' },
        { key: 'slideInDown', name: 'Slide In Down' },
        { key: 'zoomIn', name: 'Zoom In' },
        { key: 'zoomOut', name: 'Zoom Out' },
        { key: 'rotateIn', name: 'Rotate In' },
        { key: 'bounceIn', name: 'Bounce In' },
        { key: 'flipInX', name: 'Flip In X' },
        { key: 'flipInY', name: 'Flip In Y' }
    ];

    // Icon options (using Lucide icons as examples)
    const iconOptions = [
        { key: 'none', name: 'None', icon: null },
        { key: 'arrow', name: 'Arrow Right', icon: '→' },
        { key: 'star', name: 'Star', icon: '★' },
        { key: 'check', name: 'Check', icon: '✓' },
        { key: 'dot', name: 'Dot', icon: '•' },
        { key: 'diamond', name: 'Diamond', icon: '♦' },
        { key: 'triangle', name: 'Triangle', icon: '▶' },
        { key: 'circle', name: 'Circle', icon: '●' },
        { key: 'square', name: 'Square', icon: '■' },
        { key: 'heart', name: 'Heart', icon: '♥' }
    ];

    // Layout options
    const layouts = [
        { key: 'title-content', name: 'Title & Content' },
        { key: 'two-column', name: 'Two Column' },
        { key: 'image-background-text-overlay', name: 'Image Background with Text' },
        { key: 'centered', name: 'Centered' },
        { key: 'comparison', name: 'Comparison' }
    ];

    // Theme options
    const themes = [
        { key: 'academic', name: 'Academic' },
        { key: 'business', name: 'Business' },
        { key: 'creative', name: 'Creative' },
        { key: 'minimal', name: 'Minimal' },
        { key: 'dark', name: 'Dark' }
    ];

    // Background options
    const backgrounds = {
        bg1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bg2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        bg3: '#ffffff',
        bg4: '#f8f9fa',
        bg11: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        bg12: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    };

    const updateEditingSlide = (key, value) => {
        setEditingSlide(prev => ({ ...prev, [key]: value }));
    };

    const updateEditingSlideDesign = (key, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
    };

    const updateFont = (fontType, property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                [fontType]: {
                    ...prev.design[fontType],
                    [property]: value
                }
            }
        }));
    };

    const updateAnimation = (property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                animation: {
                    ...prev.design.animation,
                    [property]: value
                }
            }
        }));
    };

    const updateBorder = (property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                border: {
                    ...prev.design.border,
                    [property]: value
                }
            }
        }));
    };

    const updateShadow = (property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                shadow: {
                    ...prev.design.shadow,
                    [property]: value
                }
            }
        }));
    };

    const updateTransform = (property, value) => {
        setEditingSlide(prev => ({
            ...prev,
            design: {
                ...prev.design,
                transform: {
                    ...prev.design.transform,
                    [property]: value
                }
            }
        }));
    };

    const addPoint = () => {
        setEditingSlide(prev => ({
            ...prev,
            points: [...prev.points, '']
        }));
    };

    const updatePoint = (index, value) => {
        setEditingSlide(prev => ({
            ...prev,
            points: prev.points.map((point, i) => i === index ? value : point)
        }));
    };

    const removePoint = (index) => {
        setEditingSlide(prev => ({
            ...prev,
            points: prev.points.filter((_, i) => i !== index)
        }));
    };

    const RenderSlideContent = ({ slide }) => {
        const backgroundStyle = {
            background: backgrounds[slide.design.backgroundColor] || slide.design.backgroundColor,
            transform: `rotate(${slide.design.transform.rotate}deg) scale(${slide.design.transform.scale}) skewX(${slide.design.transform.skewX}deg) skewY(${slide.design.transform.skewY}deg)`,
            borderWidth: slide.design.border.width,
            borderStyle: slide.design.border.style,
            borderColor: slide.design.border.color,
            borderRadius: slide.design.border.radius,
            boxShadow: slide.design.shadow.enabled ?
                `${slide.design.shadow.x}px ${slide.design.shadow.y}px ${slide.design.shadow.blur}px ${slide.design.shadow.color}` : 'none'
        };

        return (
            <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center" style={backgroundStyle}>
                <h1
                    style={{
                        fontFamily: slide.design.titleFont.family,
                        fontSize: `${slide.design.titleFont.size}px`,
                        fontWeight: slide.design.titleFont.weight,
                        fontStyle: slide.design.titleFont.style,
                        color: slide.design.titleFont.color || slide.design.textColor,
                        letterSpacing: `${slide.design.letterSpacing}px`,
                        lineHeight: slide.design.lineHeight,
                        marginBottom: '20px'
                    }}
                >
                    {slide.title}
                </h1>
                <ul className="list-none space-y-2">
                    {slide.points.map((point, index) => (
                        <li
                            key={index}
                            style={{
                                fontFamily: slide.design.bodyFont.family,
                                fontSize: `${slide.design.bodyFont.size}px`,
                                fontWeight: slide.design.bodyFont.weight,
                                fontStyle: slide.design.bodyFont.style,
                                color: slide.design.bodyFont.color || slide.design.textColor,
                                letterSpacing: `${slide.design.letterSpacing}px`,
                                lineHeight: slide.design.lineHeight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {slide.design.customBulletIcon && (
                                <span className="mr-2">
                                    {iconOptions.find(icon => icon.key === slide.design.customBulletIcon)?.icon || '•'}
                                </span>
                            )}
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === id
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Slide</h2>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
                        <TabButton id="content" label="Content" icon={Type} />
                        <TabButton id="design" label="Design" icon={Palette} />
                        <TabButton id="animation" label="Animation" icon={Zap} />
                        <TabButton id="advanced" label="Advanced" icon={IconIcon} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Edit Form */}
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">


                            {/* Content Tab */}
                            {activeTab === 'content' && (
                                <>
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={editingSlide.title}
                                            onChange={(e) => updateEditingSlide('title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Content Points */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content Points</label>
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

                                    {/* Speaker Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Speaker Notes</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                        <input
                                            type="text"
                                            value={editingSlide.tags.join(', ')}
                                            onChange={(e) => updateEditingSlide('tags', e.target.value.split(', ').filter(tag => tag.trim()))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="presentation, business, marketing"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                                    </div>
                                </>
                            )}

                            {/* Design Tab */}
                            {activeTab === 'design' && (
                                <>
                                    {/* Layout */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                                        <select
                                            value={editingSlide.design.layout}
                                            onChange={(e) => updateEditingSlideDesign('layout', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {layouts.map(layout => (
                                                <option key={layout.key} value={layout.key}>{layout.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Theme */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                        <select
                                            value={editingSlide.design.theme}
                                            onChange={(e) => updateEditingSlideDesign('theme', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {themes.map(theme => (
                                                <option key={theme.key} value={theme.key}>{theme.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Background */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {Object.entries(backgrounds).map(([key, bg]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => updateEditingSlideDesign('backgroundColor', key)}
                                                    className={`w-full h-12 rounded-lg border-2 transition-all ${editingSlide.design.backgroundColor === key
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                    style={{ background: bg }}
                                                    title={key}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title Font */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title Font</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <select
                                                value={editingSlide.design.titleFont.family}
                                                onChange={(e) => updateFont('titleFont', 'family', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {fontFamilies.map(font => (
                                                    <option key={font} value={font}>{font}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={editingSlide.design.titleFont.size}
                                                onChange={(e) => updateFont('titleFont', 'size', parseInt(e.target.value))}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Size"
                                            />
                                            <select
                                                value={editingSlide.design.titleFont.weight}
                                                onChange={(e) => updateFont('titleFont', 'weight', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="bold">Bold</option>
                                                <option value="lighter">Light</option>
                                                <option value="bolder">Extra Bold</option>
                                            </select>
                                            <select
                                                value={editingSlide.design.titleFont.style}
                                                onChange={(e) => updateFont('titleFont', 'style', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="italic">Italic</option>
                                                <option value="oblique">Oblique</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Body Font */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Body Font</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <select
                                                value={editingSlide.design.bodyFont.family}
                                                onChange={(e) => updateFont('bodyFont', 'family', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {fontFamilies.map(font => (
                                                    <option key={font} value={font}>{font}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={editingSlide.design.bodyFont.size}
                                                onChange={(e) => updateFont('bodyFont', 'size', parseInt(e.target.value))}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Size"
                                            />
                                            <select
                                                value={editingSlide.design.bodyFont.weight}
                                                onChange={(e) => updateFont('bodyFont', 'weight', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="bold">Bold</option>
                                                <option value="lighter">Light</option>
                                                <option value="bolder">Extra Bold</option>
                                            </select>
                                            <select
                                                value={editingSlide.design.bodyFont.style}
                                                onChange={(e) => updateFont('bodyFont', 'style', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="italic">Italic</option>
                                                <option value="oblique">Oblique</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Text Color */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
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
                                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                placeholder="#ffffff"
                                            />
                                        </div>
                                    </div>

                                    {/* Typography Settings */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Typography</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Line Height</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={editingSlide.design.lineHeight}
                                                    onChange={(e) => updateEditingSlideDesign('lineHeight', parseFloat(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Letter Spacing</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.letterSpacing}
                                                    onChange={(e) => updateEditingSlideDesign('letterSpacing', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bullet Style & Icons */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Style</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {iconOptions.map(icon => (
                                                <button
                                                    key={icon.key}
                                                    onClick={() => updateEditingSlideDesign('customBulletIcon', icon.key)}
                                                    className={`p-3 text-center border rounded-lg transition-all ${editingSlide.design.customBulletIcon === icon.key
                                                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                    title={icon.name}
                                                >
                                                    {icon.icon || 'None'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Animation Tab */}
                            {activeTab === 'animation' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Animation</label>
                                        <select
                                            value={editingSlide.design.animation.entrance}
                                            onChange={(e) => updateAnimation('entrance', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {animations.map(animation => (
                                                <option key={animation.key} value={animation.key}>{animation.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (ms)</label>
                                            <input
                                                type="number"
                                                value={editingSlide.design.animation.duration}
                                                onChange={(e) => updateAnimation('duration', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Delay (ms)</label>
                                            <input
                                                type="number"
                                                value={editingSlide.design.animation.delay}
                                                onChange={(e) => updateAnimation('delay', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Advanced Tab */}
                            {activeTab === 'advanced' && (
                                <>
                                    {/* Transform */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Transform</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Rotate (deg)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.transform.rotate}
                                                    onChange={(e) => updateTransform('rotate', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Scale</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={editingSlide.design.transform.scale}
                                                    onChange={(e) => updateTransform('scale', parseFloat(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Skew X (deg)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.transform.skewX}
                                                    onChange={(e) => updateTransform('skewX', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Skew Y (deg)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.transform.skewY}
                                                    onChange={(e) => updateTransform('skewY', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Border */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Border</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Width (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.border.width}
                                                    onChange={(e) => updateBorder('width', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Style</label>
                                                <select
                                                    value={editingSlide.design.border.style}
                                                    onChange={(e) => updateBorder('style', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="none">None</option>
                                                    <option value="solid">Solid</option>
                                                    <option value="dashed">Dashed</option>
                                                    <option value="dotted">Dotted</option>
                                                    <option value="double">Double</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Color</label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="color"
                                                        value={editingSlide.design.border.color}
                                                        onChange={(e) => updateBorder('color', e.target.value)}
                                                        className="w-8 h-6 rounded border border-gray-300 cursor-pointer"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editingSlide.design.border.color}
                                                        onChange={(e) => updateBorder('color', e.target.value)}
                                                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                        placeholder="#000000"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Radius (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.border.radius}
                                                    onChange={(e) => updateBorder('radius', parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shadow */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
                                        <div className="mb-3">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editingSlide.design.shadow.enabled}
                                                    onChange={(e) => updateShadow('enabled', e.target.checked)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">Enable Shadow</span>
                                            </label>
                                        </div>
                                        {editingSlide.design.shadow.enabled && (
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">X Offset (px)</label>
                                                    <input
                                                        type="number"
                                                        value={editingSlide.design.shadow.x}
                                                        onChange={(e) => updateShadow('x', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Y Offset (px)</label>
                                                    <input
                                                        type="number"
                                                        value={editingSlide.design.shadow.y}
                                                        onChange={(e) => updateShadow('y', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Blur (px)</label>
                                                    <input
                                                        type="number"
                                                        value={editingSlide.design.shadow.blur}
                                                        onChange={(e) => updateShadow('blur', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Color</label>
                                                    <input
                                                        type="text"
                                                        value={editingSlide.design.shadow.color}
                                                        onChange={(e) => updateShadow('color', e.target.value)}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                        placeholder="rgba(0,0,0,0.1)"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Padding */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Top (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.padding?.top || 20}
                                                    onChange={(e) => updateEditingSlideDesign('padding', {
                                                        ...editingSlide.design.padding,
                                                        top: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Right (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.padding?.right || 20}
                                                    onChange={(e) => updateEditingSlideDesign('padding', {
                                                        ...editingSlide.design.padding,
                                                        right: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Bottom (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.padding?.bottom || 20}
                                                    onChange={(e) => updateEditingSlideDesign('padding', {
                                                        ...editingSlide.design.padding,
                                                        bottom: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Left (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.padding?.left || 20}
                                                    onChange={(e) => updateEditingSlideDesign('padding', {
                                                        ...editingSlide.design.padding,
                                                        left: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Margin */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Margin</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Top (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.margin?.top || 0}
                                                    onChange={(e) => updateEditingSlideDesign('margin', {
                                                        ...editingSlide.design.margin,
                                                        top: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Right (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.margin?.right || 0}
                                                    onChange={(e) => updateEditingSlideDesign('margin', {
                                                        ...editingSlide.design.margin,
                                                        right: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Bottom (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.margin?.bottom || 0}
                                                    onChange={(e) => updateEditingSlideDesign('margin', {
                                                        ...editingSlide.design.margin,
                                                        bottom: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Left (px)</label>
                                                <input
                                                    type="number"
                                                    value={editingSlide.design.margin?.left || 0}
                                                    onChange={(e) => updateEditingSlideDesign('margin', {
                                                        ...editingSlide.design.margin,
                                                        left: parseInt(e.target.value)
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alignment */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Horizontal</label>
                                                <select
                                                    value={editingSlide.design.alignment?.horizontal || 'left'}
                                                    onChange={(e) => updateEditingSlideDesign('alignment', {
                                                        ...editingSlide.design.alignment,
                                                        horizontal: e.target.value
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="left">Left</option>
                                                    <option value="center">Center</option>
                                                    <option value="right">Right</option>
                                                    <option value="justify">Justify</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Vertical</label>
                                                <select
                                                    value={editingSlide.design.alignment?.vertical || 'top'}
                                                    onChange={(e) => updateEditingSlideDesign('alignment', {
                                                        ...editingSlide.design.alignment,
                                                        vertical: e.target.value
                                                    })}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="top">Top</option>
                                                    <option value="middle">Middle</option>
                                                    <option value="bottom">Bottom</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reset Button */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => {
                                                // Reset to default values
                                                setEditingSlide(prev => ({
                                                    ...prev,
                                                    design: {
                                                        ...prev.design,
                                                        transform: { rotate: 0, scale: 1, skewX: 0, skewY: 0 },
                                                        border: { width: 0, style: "none", color: "#000000", radius: 0 },
                                                        shadow: { enabled: false, x: 0, y: 2, blur: 4, color: "rgba(0,0,0,0.1)" },
                                                        padding: { top: 20, right: 20, bottom: 20, left: 20 },
                                                        margin: { top: 0, right: 0, bottom: 0, left: 0 },
                                                        alignment: { horizontal: 'left', vertical: 'top' }
                                                    }
                                                }));
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Reset Advanced Settings
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}

export default EnhancedSlideEditor