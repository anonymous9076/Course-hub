import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code, Palette, Megaphone, Calculator, Atom,
  Database, Globe, BookOpen, PenTool, BarChart,
  Cpu, Terminal, Music, Camera, Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

const BoxCard = ({ item, index }) => {

  // Memoized icon selection based on category name
  const { icon: Icon, color, gradient } = useMemo(() => {
    const name = item.name.toLowerCase();

    if (name.includes('web') || name.includes('dev')) return { icon: Code, color: 'text-blue-600', gradient: 'from-blue-50 to-blue-100' };
    if (name.includes('design') || name.includes('art')) return { icon: Palette, color: 'text-purple-600', gradient: 'from-purple-50 to-purple-100' };
    if (name.includes('seo') || name.includes('marketing')) return { icon: Megaphone, color: 'text-orange-600', gradient: 'from-orange-50 to-orange-100' };
    if (name.includes('math')) return { icon: Calculator, color: 'text-red-600', gradient: 'from-red-50 to-red-100' };
    if (name.includes('phy') || name.includes('sci')) return { icon: Atom, color: 'text-green-600', gradient: 'from-green-50 to-green-100' };
    if (name.includes('data') || name.includes('dsa')) return { icon: Database, color: 'text-cyan-600', gradient: 'from-cyan-50 to-cyan-100' };
    if (name.includes('business')) return { icon: BarChart, color: 'text-indigo-600', gradient: 'from-indigo-50 to-indigo-100' };

    // Default
    return { icon: BookOpen, color: 'text-gray-600', gradient: 'from-gray-50 to-gray-100' };
  }, [item.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/courses/${item.name}`}
        className={cn(
          "relative flex items-center justify-between p-6 h-28 w-full rounded-2xl overflow-hidden transition-all duration-300",
          "bg-gradient-to-br border border-white/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10",
          gradient
        )}
      >
        <div className="relative z-10 flex flex-col gap-1">
          <span className={cn("p-2 w-fit rounded-lg bg-white/60 backdrop-blur-sm", color)}>
            <Icon size={24} strokeWidth={2.5} />
          </span>
          <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight mt-1 line-clamp-2">
            {item.name}
          </h3>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <Icon size={120} strokeWidth={1} />
        </div>
      </Link>
    </motion.div>
  );
}

export default BoxCard;