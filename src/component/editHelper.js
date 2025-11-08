// Enhanced helper functions for slide editing with better error handling and optimization

const useSlideEditor = (slides, setSlides, currentSlide, projectId, token, API_BASE_URL) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    // Debounced save function to prevent excessive API calls
    const debouncedSave = useCallback(
        debounce(async (updatedSlides) => {
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
                    throw new Error(errorData.message || 'Failed to save slide');
                }

                const data = await res.json();
                setSaveError(null);
                return data.updated.slides;
            } catch (err) {
                setSaveError(err.message);
                throw err;
            }
        }, 1000),
        [projectId, token, API_BASE_URL]
    );

    const updateEditingSlide = useCallback((field, value) => {
        setEditingSlide(prev => {
            if (!prev) return null;

            // Validate the update
            if (field === 'title' && typeof value !== 'string') {
                console.warn('Title must be a string');
                return prev;
            }

            if (field === 'points' && !Array.isArray(value)) {
                console.warn('Points must be an array');
                return prev;
            }

            return {
                ...prev,
                [field]: value
            };
        });
    }, []);

    const isImageBackground = useCallback((bg) => {
        return bg && typeof bg === 'string' && (
            bg.startsWith('data:') ||
            bg.startsWith('http') ||
            bg.startsWith('/') ||
            bg.startsWith('blob:') ||
            /\.(svg|png|jpe?g|webp)$/i.test(bg)
        );
    }, []);

    const updateEditingSlideDesign = useCallback((property, value) => {
        setEditingSlide(prev => {
            if (!prev) return null;

            const newDesign = {
                ...prev.design,
                [property]: value
            };

            // Clear conflicting background properties
            const backgroundProps = ['backgroundColor', 'backgroundGradient', 'backgroundImage', 'background'];
            if (backgroundProps.includes(property)) {
                backgroundProps.forEach(prop => {
                    if (prop !== property) {
                        delete newDesign[prop];
                    }
                });
            }

            return {
                ...prev,
                design: newDesign
            };
        });
    }, []);

    const updatePoint = useCallback((index, value) => {
        if (!editingSlide || !editingSlide.points) return;

        if (index < 0 || index >= editingSlide.points.length) {
            console.warn('Invalid point index');
            return;
        }

        const newPoints = [...editingSlide.points];
        newPoints[index] = value;
        updateEditingSlide('points', newPoints);
    }, [editingSlide, updateEditingSlide]);

    const addPoint = useCallback(() => {
        if (!editingSlide) return;

        const newPoints = [...(editingSlide.points || []), 'New point'];
        updateEditingSlide('points', newPoints);
    }, [editingSlide, updateEditingSlide]);

    const removePoint = useCallback((index) => {
        if (!editingSlide || !editingSlide.points) return;

        if (index < 0 || index >= editingSlide.points.length) {
            console.warn('Invalid point index');
            return;
        }

        const newPoints = editingSlide.points.filter((_, i) => i !== index);
        updateEditingSlide('points', newPoints);
    }, [editingSlide, updateEditingSlide]);

    const handleImageUpload = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Enhanced validation
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

        if (file.size > maxSize) {
            setSaveError('Image size should be less than 5MB');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setSaveError('Please select a valid image file (JPEG, PNG, WebP, SVG)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            updateEditingSlide('imageUrl', e.target.result);
            setSaveError(null);
        };
        reader.onerror = () => {
            setSaveError('Failed to read image file');
        };
        reader.readAsDataURL(file);
    }, [updateEditingSlide]);

    const startEditing = useCallback(() => {
        if (currentSlide < 0 || currentSlide >= slides.length) {
            console.warn('Invalid slide index');
            return;
        }

        setIsEditing(true);
        const slideToEdit = {
            ...slides[currentSlide],
            design: {
                ...slides[currentSlide].design,
                textColor: slides[currentSlide].design?.textColor || '#000000'
            },
            // Ensure all required fields exist
            points: slides[currentSlide].points || [],
            notes: slides[currentSlide].notes || '',
            tags: slides[currentSlide].tags || []
        };
        setEditingSlide(slideToEdit);
        setSaveError(null);
    }, [slides, currentSlide]);

    const saveEdit = useCallback(async () => {
        if (!editingSlide) {
            console.warn('No slide being edited');
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            const updatedSlides = slides.map((slide, index) => {
                if (index === currentSlide) {
                    return {
                        ...editingSlide,
                        design: {
                            ...editingSlide.design,
                            textColor: editingSlide.design.textColor || '#000000'
                        }
                    };
                }
                return slide;
            });

            // Update local state immediately for better UX
            setSlides(updatedSlides);
            setIsEditing(false);
            setEditingSlide(null);

            // Save to backend
            const savedSlides = await debouncedSave(updatedSlides);

            // Update with backend response if different
            if (savedSlides && JSON.stringify(savedSlides) !== JSON.stringify(updatedSlides)) {
                setSlides(savedSlides);
            }
        } catch (err) {
            console.error('Error saving slide:', err.message);
            // Optionally revert local changes on error
            // setSlides(slides);
        } finally {
            setIsSaving(false);
        }
    }, [editingSlide, slides, currentSlide, setSlides, debouncedSave]);

    const cancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditingSlide(null);
        setSaveError(null);
    }, []);

    // Auto-save functionality (optional)
    const enableAutoSave = useCallback(() => {
        if (editingSlide && isEditing) {
            const updatedSlides = slides.map((slide, index) => {
                if (index === currentSlide) {
                    return editingSlide;
                }
                return slide;
            });
            debouncedSave(updatedSlides);
        }
    }, [editingSlide, isEditing, slides, currentSlide, debouncedSave]);

    return {
        // State
        isEditing,
        editingSlide,
        isSaving,
        saveError,

        // Actions
        startEditing,
        saveEdit,
        cancelEdit,
        updateEditingSlide,
        updateEditingSlideDesign,
        updatePoint,
        addPoint,
        removePoint,
        handleImageUpload,
        enableAutoSave,

        // Utilities
        isImageBackground
    };
};

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced validation utilities
const slideValidators = {
    title: (value) => typeof value === 'string' && value.trim().length > 0,
    points: (value) => Array.isArray(value) && value.every(point => typeof point === 'string'),
    tags: (value) => Array.isArray(value) && value.every(tag => typeof tag === 'string'),
    imageUrl: (value) => !value || (typeof value === 'string' && value.length > 0),
    notes: (value) => typeof value === 'string'
};

const validateSlide = (slide) => {
    const errors = [];

    Object.entries(slideValidators).forEach(([field, validator]) => {
        if (slide.hasOwnProperty(field) && !validator(slide[field])) {
            errors.push(`Invalid ${field}: ${slide[field]}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

export { useSlideEditor, validateSlide, slideValidators };