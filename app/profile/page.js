import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

import ProfilePage from '../../components/profile/Profile'

function page() {
  return (
    <div className="container mx-auto px-4 py-8">
   
        <ProfilePage />
    
    </div>
  )
}

export default page