# Chatbot Flow Builder

A beautiful and intuitive visual flow builder for creating chatbot conversations. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**[View Live Demo](https://nodeee.netlify.app/)**

## ✨ Features

- **Visual Flow Builder**: Drag and drop interface for creating chatbot flows
- **Text Message Nodes**: Support for text-based conversation nodes
- **Node Connections**: Connect nodes with visual edges to define conversation flow
- **Real-time Editing**: Edit node content with live preview
- **Flow Validation**: Automatic validation to ensure proper flow structure
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🎯 How to Use - Demo Instructions

### 1. Adding Your First Node
1. Look at the **Nodes Panel** on the right side of the screen
2. Find the "Message" node with the chat bubble icon
3. **Drag** the Message node from the panel into the canvas area
4. **Drop** it anywhere on the gray canvas
5. You'll see a green "Send Message" node appear with connection handles

### 2. Editing Node Content
1. **Click** on any node to select it (you'll see a blue border)
2. The right panel will switch to **Settings Panel**
3. Type your message in the text area
4. Changes are saved automatically as you type
5. Click the **back arrow** to return to the Nodes Panel

### 3. Connecting Nodes
1. Add at least 2 nodes to the canvas
2. **Click** on the **bottom circle** (source handle) of the first node
3. You'll see a blue highlight and connection instructions
4. **Click** on the **top circle** (target handle) of the second node
5. A curved arrow will connect the two nodes
6. Each node can only have **one outgoing connection** but **multiple incoming connections**

### 4. Building a Complete Flow
1. Create multiple message nodes
2. Connect them in sequence to build your conversation flow
3. Each node represents a step in your chatbot conversation
4. The arrows show the order of execution

### 5. Saving Your Flow
1. Click the **"Save Changes"** button in the top-right corner
2. ✅ **Success**: If your flow is valid, you'll see a green "Flow saved successfully!" message
3. ❌ **Error**: If there are validation issues, you'll see a red "Cannot save Flow" message

### 6. Flow Validation Rules
- **Single Entry Point**: Only one node should have no incoming connections (the starting point)
- **Connected Flow**: All nodes should be part of the main conversation flow
- **No Orphaned Nodes**: Avoid having multiple disconnected nodes

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd chatbot-flow-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FlowCanvas.tsx   # Main canvas area
│   ├── Node.tsx         # Individual node component
│   ├── Edge.tsx         # Connection lines between nodes
│   ├── NodesPanel.tsx   # Draggable nodes panel
│   ├── SettingsPanel.tsx # Node editing panel
│   └── SaveButton.tsx   # Save functionality
├── hooks/
│   └── useFlowBuilder.ts # Main flow logic hook
├── types/
│   └── flow.ts          # TypeScript type definitions
├── data/
│   └── nodeTypes.ts     # Available node types
└── App.tsx              # Main application component
```

## 🎨 Design Features

- **Apple-level Design**: Clean, minimalist interface with attention to detail
- **Smooth Animations**: Hover effects and transitions for better UX
- **Visual Feedback**: Clear indicators for connections and selections
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔧 Customization

### Adding New Node Types
1. Define new node type in `src/data/nodeTypes.ts`
2. Update the `NodeType` interface in `src/types/flow.ts`
3. Modify `Node.tsx` component to handle new node rendering
4. Update `SettingsPanel.tsx` for new node-specific settings

### Styling Customization
- Modify Tailwind classes in components
- Update `src/index.css` for global styles
- Customize colors in `tailwind.config.js`

## 🚀 Deployment

This project is automatically deployed to Netlify. Any changes pushed to the main branch will trigger a new deployment.

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

