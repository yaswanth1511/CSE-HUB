
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface UserProfileDropdownProps {
  user: any;
  onLogout: () => void;
}

const UserProfileDropdown = ({ user, onLogout }: UserProfileDropdownProps) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      
      onLogout();
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProfile = () => {
    // For now, we'll show a toast. This can be expanded to navigate to an edit page
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    });
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user?.email || 'User';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-2 border-vibrant-purple/20 hover:border-vibrant-purple/40 transition-all duration-200"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage 
              src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture} 
              alt={getUserDisplayName()} 
            />
            <AvatarFallback className="bg-gradient-to-br from-vibrant-purple to-vibrant-pink text-white text-sm font-semibold">
              {getInitials(user?.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 p-2 bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-xl"
        align="end"
        sideOffset={5}
      >
        {/* User Info Section */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture} 
              alt={getUserDisplayName()} 
            />
            <AvatarFallback className="bg-gradient-to-br from-vibrant-purple to-vibrant-pink text-white font-semibold">
              {getInitials(user?.email || 'U')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {getUserDisplayName()}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Menu Items */}
        <DropdownMenuItem 
          onClick={handleEditProfile}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
        >
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Edit Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
