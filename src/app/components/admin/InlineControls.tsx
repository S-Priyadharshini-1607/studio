import { Edit2, Trash2, Plus, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface InlineControlsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  variant?: 'item' | 'section';
}

export default function InlineControls({ onEdit, onDelete, onAdd, variant = 'item' }: InlineControlsProps) {
  return (
    <div className={`flex items-center gap-2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-xl border border-gray-100 dark:border-gray-800 pointer-events-auto ${variant === 'section' ? 'mb-4' : ''}`}>
      {variant === 'item' && (
        <div className="px-2 text-gray-400 cursor-grab active:cursor-grabbing border-r border-gray-100 dark:border-gray-800">
          <GripVertical size={16} />
        </div>
      )}
      
      {onAdd && (
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors flex items-center gap-2 px-3"
        >
          <Plus size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Add</span>
        </button>
      )}

      {onEdit && (
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
      )}

      {onDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-full transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
