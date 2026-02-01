import { useState, useEffect } from 'react'

// SVG Icons
const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const RefreshIcon = ({ spinning }) => (
  <svg className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const UserCircleIcon = () => (
  <svg className="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-4 h-4 animate-pulse text-primary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
)

const EmptyIcon = () => (
  <svg className="w-16 h-16 text-muted animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

function App() {
  const [participants, setParticipants] = useState([])
  const [newIds, setNewIds] = useState(new Set())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchParticipants = async () => {
    try {
      setIsRefreshing(true)
      const res = await fetch('/participants')
      const data = await res.json()

      const currentIds = new Set(participants.map(p => p.id))
      const incoming = data.filter(p => !currentIds.has(p.id))
      if (incoming.length > 0) {
        setNewIds(new Set(incoming.map(p => p.id)))
        setTimeout(() => setNewIds(new Set()), 2000)
      }

      setParticipants(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  useEffect(() => {
    fetchParticipants()
    const interval = setInterval(fetchParticipants, 5000)
    return () => clearInterval(interval)
  }, [])

  const clearAll = async () => {
    if (confirm('ลบรายชื่อทั้งหมด?')) {
      await fetch('/participants', { method: 'DELETE' })
      fetchParticipants()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-text tracking-tight">Workshop API</h1>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm text-primary font-medium">LIVE</span>
            </div>
          </div>

          {/* Counter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <UsersIcon />
            <span className="text-xl font-bold text-primary">{participants.length}</span>
            <span className="text-muted">ผู้เข้าร่วม</span>
          </div>
        </header>

        {/* Participants */}
        <div className="mb-8">
          {participants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <EmptyIcon />
              <p className="mt-6 text-muted/80 text-lg">รอลงทะเบียน...</p>
              <p className="text-sm text-muted/50">ผู้เข้าร่วมจะปรากฏที่นี่</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {participants.map((p, i) => (
                <div
                  key={p.id}
                  className={`participant-card relative rounded-xl p-4 overflow-hidden text-center ${newIds.has(p.id) ? 'is-new' : ''
                    }`}
                >
                  {/* Name */}
                  <div className="flex items-center justify-center gap-1">
                    <span className={`font-medium text-sm truncate ${newIds.has(p.id) ? 'text-primary' : 'text-text'}`}>
                      {p.name}
                    </span>
                    {newIds.has(p.id) && <SparkleIcon />}
                  </div>

                  {/* Note */}
                  {p.note && (
                    <p className="text-xs text-muted truncate mt-1">{p.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-12">
          <button
            onClick={fetchParticipants}
            className="btn-secondary inline-flex items-center justify-center w-11 h-11 rounded-xl"
            title="รีเฟรช"
          >
            <RefreshIcon spinning={isRefreshing} />
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center border-t border-border pt-8">
          <p className="text-muted/70">
            แท็ก IG{' '}
            <a
              href="https://instagram.com/ping.p_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @ping.p_
            </a>
            {' '}ได้นะ 📷
          </p>
          <p className="mt-2 text-sm text-muted/50">
            Auto-refresh every 5 seconds
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
