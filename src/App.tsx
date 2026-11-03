import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { standaloneDocs } from './data/course'
import { DayPage } from './pages/DayPage'
import { Home } from './pages/Home'
import { DiasIndex } from './pages/DiasIndex'
import { NotFound } from './pages/NotFound'
import { ProjectDocPage } from './pages/ProjectDocPage'
import { ProjectIndex } from './pages/ProjectIndex'
import { StandalonePage } from './pages/StandalonePage'
import { TopicPage } from './pages/TopicPage'

function LegacyDaysRedirect() {
  const { pathname, search, hash } = useLocation()
  const destination = `/dias${pathname.replace(/^\/jornadas/, '')}${search}${hash}`
  return <Navigate to={destination} replace />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dias" element={<DiasIndex />} />
        <Route path="/dias/:daySlug" element={<DayPage />} />
        <Route path="/dias/:daySlug/:topicSlug" element={<TopicPage />} />
        <Route path="/jornadas/*" element={<LegacyDaysRedirect />} />
        <Route path="/proyecto-conductor" element={<ProjectIndex />} />
        <Route path="/proyecto-conductor/:docSlug" element={<ProjectDocPage />} />
        {standaloneDocs.map((doc) => (
          <Route key={doc.path} path={doc.path} element={<StandalonePage doc={doc} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
