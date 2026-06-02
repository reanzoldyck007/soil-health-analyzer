// Shared Tailwind configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "on-tertiary": "#ffffff",
                "tertiary": "#79564b",
                "on-error-container": "#93000a",
                "tertiary-fixed-dim": "#e9bdae",
                "primary-container": "#76c043",
                "secondary-container": "#beead1",
                "surface-variant": "#e4e2dd",
                "surface-container-high": "#eae8e3",
                "on-secondary": "#ffffff",
                "error-container": "#ffdad6",
                "surface-tint": "#316b00",
                "tertiary-fixed": "#ffdbcf",
                "on-error": "#ffffff",
                "inverse-surface": "#30312e",
                "surface": "#fbf9f4",
                "surface-bright": "#fbf9f4",
                "on-tertiary-fixed": "#2d150d",
                "on-primary-fixed-variant": "#245100",
                "primary-fixed": "#a9f773",
                "inverse-primary": "#8eda5a",
                "on-secondary-fixed-variant": "#274e3d",
                "on-primary-container": "#204b00",
                "on-secondary-container": "#436b58",
                "surface-container-low": "#f5f3ee",
                "on-tertiary-fixed-variant": "#5e3f35",
                "surface-container": "#f0eee9",
                "surface-dim": "#dbdad5",
                "background": "#fbf9f4",
                "error": "#ba1a1a",
                "outline": "#717a68",
                "inverse-on-surface": "#f2f1ec",
                "on-background": "#1b1c19",
                "secondary": "#3f6653",
                "on-primary": "#ffffff",
                "surface-container-lowest": "#ffffff",
                "tertiary-container": "#cea496",
                "on-secondary-fixed": "#002114",
                "secondary-fixed-dim": "#a5d0b9",
                "primary": "#316b00",
                "on-tertiary-container": "#583a2f",
                "on-surface": "#1b1c19",
                "on-primary-fixed": "#0a2000",
                "surface-container-highest": "#e4e2dd",
                "on-surface-variant": "#414939",
                "secondary-fixed": "#c1ecd4",
                "outline-variant": "#c1cab5",
                "primary-fixed-dim": "#8eda5a"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                "container-margin": "24px",
                "gutter": "16px",
                "touch-target-min": "48px",
                "unit": "8px",
                "section-gap": "40px"
            },
            fontFamily: {
                "body-lg": ["Inter"],
                "label-sm": ["Inter"],
                "body-md": ["Inter"],
                "label-md": ["Inter"],
                "headline-lg": ["Inter"],
                "headline-md": ["Inter"]
            },
            fontSize: {
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" }],
                "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
                "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }]
            }
        }
    }
};

// ── Analyzer page step-flow is now handled in analyzer.php ──────
