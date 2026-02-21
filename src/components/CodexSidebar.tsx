import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface CodexSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onRelationshipDragStart?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onRelationshipDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onRelationshipDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const CodexSidebar: React.FC<CodexSidebarProps> = ({ isOpen, onClose, onRelationshipDragStart, onRelationshipDragEnd, onRelationshipDrag }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    content: `
      <p>The Whispering Woods is not merely a forest, but a sentient organism of vast proportions. Travelers report that the trees themselves seem to shift positions when not directly observed, creating a labyrinth that defies traditional cartography.</p>
      <p>Local legends speak of the "Unseen Fae," entities that exist in the peripheral vision of those who dare enter. They do not speak with voices, but rather through the rustling of leaves and the creaking of ancient branches.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none text-white/80 font-sans font-light leading-relaxed',
      },
    },
  });

  return (
    <div className={`absolute inset-0 flex items-center justify-center z-50 pointer-events-none p-12 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl h-[85vh] pointer-events-auto flex flex-col relative overflow-hidden bg-gray-900/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl"
        style={{
             boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-semibold">Codex Inspection</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">open_in_full</span>
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-10 flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar pr-4">
            <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-white/30">
              <span>Root</span>
              <span>→</span>
              <span>Fractured Lands</span>
              <span>→</span>
              <span className="text-white/60">Whispering Woods</span>
            </div>
            <h1 className="font-serif text-6xl text-white mb-8 leading-none tracking-tight drop-shadow-sm">Whispering Woods</h1>
            
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 mb-6 transition-all duration-300 hover:bg-white/10 hover:border-white/10">
              <EditorContent editor={editor} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/10">
                <h3 className="font-serif text-xl text-white mb-3 italic">Flora</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Notable species include the <span className="text-white border-b border-white/20 cursor-pointer hover:border-white/60 transition-colors">Silver-Barked Oak</span>.
                </p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/10">
                <h3 className="font-serif text-xl text-white mb-3 italic">Fauna</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Luminous <span className="text-white border-b border-white/20 cursor-pointer hover:border-white/60 transition-colors">Ghost Ferns</span> glow faintly near magic.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Right Column */}
          <div className="w-72 flex flex-col gap-4">
             <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col gap-5">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-white/30 mb-2">Type</label>
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <span className="material-symbols-outlined text-lg">forest</span>
                  Territory
                </div>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-white/30 mb-2">Status</label>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]"></span>
                  Active
                </div>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-white/30 mb-2">Date Created</label>
                <div className="text-white/60 text-sm font-light">Age of Dust, 402</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-3xl p-1 flex-1 min-h-[120px] flex items-center justify-center relative overflow-hidden group">
              <img
                alt="Atmospheric forest background"
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByVTR-yxgCClyixotMUZlPor2O-lqoFPHuXmgVjWa4bFIy_XOXtFuDFgEpSxw9jT2LbYlAUdQ6_jrnu2IC7WYOEozccyXXobBTeyyixE_B9_SnkRIGd1IXmMVOVLZhrGxZMDqisvQxGzBcYenfCND1earVxqjOC5rYdJ96dVnhzBlMHchYwLidtYINofq5wxl9RBCCETqyug6U5ioV2hLz-xhcfr1b-_6WXJvMU-9P5k20l5aAECVQpD1NoTgoSqzCsTve9ON1cA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="relative z-10 text-xs uppercase tracking-widest text-white/80 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
                View Map
              </span>
            </div>
          </div>

          {/* Relational Tagging Matrix */}
          <div className="w-[300px] relative flex items-center justify-center">
             <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-white/80 text-2xl">hub</span>
                <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1">Relations</span>
              </div>
              <div className="absolute w-48 h-48 rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute w-64 h-64 rounded-full border border-white/5 opacity-50"></div>
              
              <motion.div 
                className="absolute top-[25%] right-[20%] cursor-pointer z-30"
                drag
                dragMomentum={false}
                dragElastic={0.1}
                whileHover={{ scale: 1.1 }}
                onDragStart={onRelationshipDragStart}
                onDragEnd={onRelationshipDragEnd}
                onDrag={onRelationshipDrag}
              >
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 group-hover:border-white/40 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">castle</span>
                  </div>
                  <div className="text-[10px] text-center w-20 text-white/40 group-hover:text-white/80 transition-colors leading-tight">The Obsidian Spire</div>
                </div>
              </motion.div>

              <motion.div 
                 className="absolute bottom-[25%] left-[20%] cursor-pointer z-30"
                 drag
                 dragMomentum={false}
                 dragElastic={0.1}
                 whileHover={{ scale: 1.1 }}
                 onDragStart={onRelationshipDragStart}
                 onDragEnd={onRelationshipDragEnd}
                 onDrag={onRelationshipDrag}
              >
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 group-hover:border-white/40 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">water_drop</span>
                  </div>
                  <div className="text-[10px] text-center w-20 text-white/40 group-hover:text-white/80 transition-colors leading-tight">Sunken Grotto</div>
                </div>
              </motion.div>

              <div className="absolute bottom-[10%]">
                <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <line stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" x1="50%" x2="75%" y1="50%" y2="35%"></line>
                <line stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" x1="50%" x2="25%" y1="50%" y2="65%"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="p-8 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-lg">history</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">
             ID: WW-892-A
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default CodexSidebar;
