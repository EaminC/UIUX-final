# Eamin's Kitchen App - UIUX Final Project

A beautiful and interactive recipe sharing application built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Multiple Login Options**: Google, Apple, and WeChat authentication
- 👨‍🍳 **Recipe Management**: Upload, edit, and manage your recipes
- 🔍 **Search & Discovery**: Find recipes by cuisine, ingredients, or meal type
- ⭐ **Rating System**: Rate and review recipes
- 💬 **Comments**: Engage with other users through comments
- 🏪 **Ingredient Store**: Find nearby stores and ingredient deals
- 🎯 **Gamification**: Earn points and badges for contributions
- 📱 **Responsive Design**: Optimized for both mobile and desktop

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Date Handling**: date-fns

## AI Tools & Technologies Used

### AI Development Tools
- **Cursor** - AI-powered code editor (primary development tool)
- **Claude (Anthropic)** - Code generation, problem-solving, and architecture decisions
- **GitHub Copilot** - Code suggestions and completions

### AI Features in App
- **AI Recipe Recommendation System** - Personalized recipe suggestions with reasoning
- **Typewriter Animation** - Character-by-character text generation effect
- **Preset AI Responses** - 4 contextual recommendations based on user behavior

### UI Libraries
- **Radix UI** - Accessible, unstyled component primitives
  - Accordion, Alert Dialog, Avatar, Badge, Button, Calendar
  - Checkbox, Dialog, Dropdown Menu, Form, Input
  - Label, Popover, Progress, Radio Group, Select
  - Separator, Slider, Switch, Tabs, Tooltip
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon set
- **class-variance-authority** - CSS class variance management
- **tailwind-merge** - Merge Tailwind CSS classes without conflicts

### Additional Libraries
- **react-day-picker** - Flexible date picker component
- **react-hook-form** - Performant form validation
- **sonner** - Toast notifications
- **vaul** - Drawer component
- **embla-carousel-react** - Carousel/slider component
- **recharts** - Charting library for data visualization

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Home.tsx        # Home feed
│   ├── Profile.tsx     # User profile
│   ├── RecipeDetail.tsx # Recipe details
│   └── ...
├── assets/             # Images and static files
├── styles/             # Global styles
└── App.tsx             # Main app component
```

## Featured Recipes

This app showcases authentic Shanghai cuisine including:
- 🥟 Shanghai Soup Dumplings (小笼包)
- 🍖 Shanghai Braised Pork (红烧肉)
- 🍜 Scallion Oil Noodles (葱油拌面)

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

## Project Documentation

- **[USER_RESEARCH.md](./USER_RESEARCH.md)** - User personas, testing findings, and iteration details
- **[PRESENTATION_NOTES.md](./PRESENTATION_NOTES.md)** - Presentation structure and demo flow
- **[PROJECT_CHECKLIST.md](./PROJECT_CHECKLIST.md)** - Project requirements checklist
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Vercel deployment guide

## Prototype Versions

- **v1**: Initial prototype with core features
- **v2**: Current version with AI recommendations, fixed interactions, and enhanced UX

### Key Improvements from v1 to v2
- ✅ Added AI Recipe Recommendation feature with typewriter animation
- ✅ Fixed calendar date picker functionality
- ✅ Fixed star rating system with visual feedback
- ✅ Made profile sections interactive (My Recipes, My Likes, Points History)
- ✅ Replaced with authentic Shanghai dish images
- ✅ Added interactive comment system
- ✅ Enhanced responsive design for desktop
- ✅ Added personal avatars and branding

## Success Metrics

| Metric | v1 | v2 | Improvement |
|--------|----|----|-------------|
| Task Completion Rate | 60% | 95% | +58% |
| User Satisfaction | 3.2/5 | 4.6/5 | +44% |
| Would Recommend | 50% | 90% | +80% |
| Average Task Time | 5 min | 2 min | -60% |

## Author

**Yiming Cheng**  
Email: eaminchan@uchicago.edu  
GitHub: [@EaminC](https://github.com/EaminC)

## License

This project is created for educational purposes as part of a UI/UX Design course final project at the University of Chicago.
