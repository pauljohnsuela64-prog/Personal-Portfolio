import { useState } from 'react'
import { profile } from '../content/profile'

export function ProfilePortrait() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="portrait-frame">
      {failed ? (
        <div className="portrait-initials" role="img" aria-label={`${profile.name} — initials`}>
          {profile.initials}
        </div>
      ) : (
        <img className="profile-photo" src={`${import.meta.env.BASE_URL}${profile.photo}`}
          srcSet={`${import.meta.env.BASE_URL}${profile.photo} 480w, ${import.meta.env.BASE_URL}${profile.photoLarge} 800w`}
          sizes="min(20rem, calc(100vw - 4rem))"
          alt={`Portrait of ${profile.name}`} width={320} height={320}
          fetchPriority="high" onError={() => setFailed(true)} />
      )}
      <div className="portrait-orbit" aria-hidden="true"><span /></div>
    </div>
  )
}
