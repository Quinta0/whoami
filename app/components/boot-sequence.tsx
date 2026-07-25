"use client"

import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  'QUINTA-BIOS (C) 2026, Pietro Quintavalle Systems',
  'CPU: AMD Ryzen 7 9800X3D @ 5.00GHz  ....................  OK',
  'Memory Test: 32768MB  ...................................  OK',
  'Detecting storage: Proxmox VE / UNRAID / TrueNAS  .......  OK',
  '',
  'Booting from /dev/homelab ...',
  '',
  '[ OK ] Started Proxmox VE 8 hypervisor',
  '[ OK ] Mounted UNRAID 7.3.1 parity array',
  '[ OK ] Mounted TrueNAS ZFS RAID 10',
  '[ OK ] Started Docker daemon (LXC + KVM)',
  '[ OK ] Established Cloudflare Tunnel .......  0 open ports',
  '[ OK ] Started Pangolin + Traefik reverse proxy',
  '[ OK ] Started Fail2Ban / Crowdsec / Authelia',
  '[ OK ] Loaded Grafana + Prometheus',
  '[ OK ] Mounted /home/quinta',
  '[ OK ] Uptime check ........................  90%+',
  '[ OK ] Loading personal_website.tsx',
]

const GREETING_LINES = [
  'Welcome back, root.',
  "Hi, I'm Pietro, systems engineer, developer, homelabber.",
]

const DURIN_ART = ` ______________     _             _,-----------._        ___
|              |   (_,.-      _,-'_,-----------._\`-._    _)_)
| THE _  _  _  |      |     ,'_,-'  ___________  \`-._\`.
| |  / \\|_)| \\ |     \`'   ,','  _,-'___________\`-._  \`.\`.
| |__\\_/| \\|_/ |        ,','  ,'_,-'     .     \`-._\`.  \`.\`.
|              |       /,'  ,','        >|<        \`.\`.  \`.\\
| OF THE  _ _  |      //  ,','      ><  ,^.  ><      \`.\`.  \\\\
| |_)||\\|/_(_  |     //  /,'      ><   / | \\   ><      \`.\\  \\\\
| | \\|| |\\_|_) |    //  //      ><    \\/\\^/\\/    ><      \\\\  \\\\
|______________|   ;;  ;;              \`---'              ::  ::
                   ||  ||              (____              ||  ||
 DOORS OF DURIN   _||__||_            ,'----.            _||__||_
                 (o.____.o)____        \`---'        ____(o.____.o)
                   |    | /,--.)                   (,--.\\ |    |
                   |    |((  -\`___               ___\`   ))|    |
                   |    | \\\\,'',  \`.           .'  .\`\`.// |    |
                   |    |  // (___,'.         .'.___) \\\\  |    |
                  /|    | ;;))  ____) .     . (____  ((\\\\ |    |\\
                  \\|.__ | ||/ .'.--.\\/       \`/,--.\`. \\;: | __,|;
                   |\`-,\`;.| :/ /,'  \`)-'   \`-('  \`.\\ \\: |.;',-'|
                   |   \`..  ' / \\__.'         \`.__/ \\ \`  ,.'   |
                   |    |,\\  /,                     ,\\  /,|    |
                   |    ||: : )          .          ( : :||    |
                  /|    |:; |/  .      ./|\\,      ,  \\| :;|    |\\
                  \\|.__ |/  :  ,/-    <--:-->    ,\\.  ;  \\| __,|;
                   |\`-.\`\`:   \`'/-.     '\\|/\`     ,-\\\`;   ;'',-'|
                   |   \`..   ,' \`'       '       \`  \`.   ,.'   |
                   |    ||  :                         :  ||    |
                   |    ||  |                         |  ||    |
                   |    ||  |                         |  ||    |
                   |    |'  |            _            |  \`|    |
                   |    |   |          '|))           |   |    |
                   ;____:   \`._        \`'           _,'   ;____:
                  {______}     \\___________________/     {______}
              SSt |______|_______________________________|______|`

const BALROG_ART = `############################+##++++++########+++++-----.   ------------ .    - --.---              --.--.------...---------------..---
###############################+++++++####+++++----- ---    -  ----   --     -. ..-  -               - -------------------------------
##########################+++++++++++++#####+++---. .  --        -      -    -      -                .--.-----------------------------
########################+++#+++++++++######++++-.                           ..--++++++------..-----        -  ------------.- ---------
###########################+##+++++++++++##++-                           -++++++++--+--------.- .. ...-.. - ----------------.---------
############################+++++++++++++#++-+            -         -++++++++++++------+++---++-------------------------   -------------.---
#############################++++++++++++#++++- ---             ++++++++++++++++--+++++++-------------------------------   -------------.---
#############################++++++++++++++++---             .+##+++++++++++++++++++++++++---------------------------.----------------
############++#+###+#+++#####++++++++++++++-- ---    --     -+###+++++++++++++++++++++++++----+---------------------------------------
###########++++++++++++#++++++++++++++--..----  .  .-- .. -+#####++++++++++++++++++++++++-+--++++-------------------------------------
############+++++++++++++++++++++++++++++++++.+  ..--.- +#########+++++++++++++++++++++++++++----+------------------------.-----------
############++++++++++++++++++++++-+++++++++++++.. + .++#####++#++++#++++++++++++++++++++++++++-------+--------------------- ---------
########+#+++++++++++++++++++++---++++-+++++++++.. -+#########-+  .+++++++++++++++++++++++-++++-+++++----+-------------------+--------
+######+#+++++++++++++++++++++-+++++++-++++++++++##+-.+++++++#+    +++++++++++++++++++++++-----+++++++++++-----+--------+-------------
++##+++++++++++++++++++++++++++++++++++++-+++.++++-+    .+++++-++++++++++++++++++++++----+---------------+++++++-----+----------------
++++++++++++++++++++++++++##+++++++++++++++.  ++#  ++  +-.++++++++++++++++#++++---+------------------------+-+++---+++-+---+-----.----
+++++++++++++++++++++++###++++++++++++++++++-+++-  +++  ++++++++++++++#++++-++----+-+----------------------+---++++++++----+--++++----
+++++++++++++++++++++###++++++++++++++++++++++++  +#+#+#+#+++#######+++#----------------------------------+-++----++-+++--+++++++----.
+++++++++++++++++++++++#++++++++++++-++++++++++##++++#++#+++#+++#+#+++++++++--+----------+------------------+-++--++-+--++++++-++-.---
++++++++++++++++++++++++++++++++++++++++++#+++++-++++##+#++##++####+++++++++++-+-----------+------------------+---++++++++++++++-++---
+++++++++++++++++++++++++++++++++++++++--++++++#++++###+#++#+#++++++++++++++++++++---+---------------------------+++++++++++++++++++--
+++++++++++++++++++++++++++++-------++--+++++#++++#+#######+#++++#+#-++-+++++++++++------------------------------+--++++++++++++++++--
+++++++++++++++++++++++++++-------+-----+#+++#+++#   #.# #+####+###++--+++++++++++++--------------.-------------+-++--++++++++++++++--
+++++++++++++++++++++-----------------+++#+--#  . - - .+####+##++-----++++++++--+----+-+--------.--------------+-----+++++++++++++--
+++++++++++++++++++++-------++----------#++++# -         #. ####+-+-.+--+++++++---+++++++----------------------------.--++++++++++++--
+++++++++++++--+++++-+-------+----------+++##. . +         +#+-  -++---+ ++++----+++++++++---------------------------..+++++++++++++--
+++++++++++++-++++++---------------------#++ ---.         +#-    +++-. -++----++-+-+-+++++--------------------------..-+++++++++++++--
++++++++++++++-----+--------------++++++++#+ +...--       +          .  - ----+-+++--++-+++-----------------------.---++++++++++++++--
++++++++----++--+++----------+++++++++++-++#++. .                    .  ----+----++---+--++-------------------------+ +++++++++++++---
+++++++++---+--------------++++++++++++++++...-.                      . -----------+---++++------------------------++++++++++++++++---
+++++++---+-++-+++-+-----+++++++++++++++++------                      .. ---------+-----+++++-+-----------------++++++++++++++++++----
+++++++-+++-+----++------+++++++++++++++++++++---                     ....----+--+------++++-++------------.+.+++++++++++##+++++++----
++++++++++++++++------+++++++++++++++++++++++++--.                  . ... ++---+--+----++++---++-------.+-.+++++++++++++#######+------
++++---++++------+---++++++++++++++++++++++++++---.                 ...-.--+--+---++--+------+-+--.-.++.+#+++#+++++###++++++#---------
-++++.--+++++---+----+++++++++++++++++++++++++++-+-...             ......---+++-++----++-----+--.---++####+++++###--++####++-----.----
++++-----+----------++++++++++++++++++++++++++++++--....           ..------++++--------------.+- ############+++##+###+---------------
+++-+++------------++++++++++++++++++++++++++++++----.....        ..----+. -+---------- ---..+###+####+###-#####++-+--.---------------
+++++++++--.------+++++++++++++++++++++++++++++. -----.... .    . ..-++-+--+-----------  .#++++#++##+--++++---+-----------.-----------
-----+-+++--------++++++++++++++++++++++++++++++---.--.... . ..  ---++-.+------------  .+-++##--#+--++--.-----------------------------
-------+++--------++++#++++++++++++++++++++++-+-------..-.      .---+--+++---------. +#-#+#+--+------.---.---.----- ----------------..
-------++++++-+------.+++++++++++++++-++++++++-- ----..... ..----+--+.++--------  +--#++-------------------------....-.---------..--
------++++++++++++---+--##++++++++++++++++++++---------......-.--+++-.-++---.---. -##++----------------------- ---.....---------......
-++---++++++#+++++##++...+#++++++++ +++++++++---------...-.---.++++...--.-+-----..+#+-----------.---------------....  ......-.........
-------+++-+++#+# ++#+....+##+#++++#+++++++++----++++---...----++++-..+.--++---.+#+-------------------------..... .   ....... . ...
++----+++++++-+---###+-+..-##+##+##+++++++++-.--------.--------+-+--------++---.#-----------..----------......    ..     .    ..
++++-+++++++++++++++##++-..##++++##+++++++++-+----..----+---+--++---------++-------------------------...-. .      .          ....
++++++++++++++++++++++##-..+++++++  ++++++ +-  - --------------+-.---------------- ----------.----------....                 . .
-+++++++-+++++++++++++#+--++.++-----------------------. .--- --------------------------------------...--..... ......         .
-++++--++++++++++++++++-++ -++.-------.------------ ------.---------.....--------------------- .--- ....... ......
----------++++--------+++.----------..--------.------------  ...-.-.-.----------------------..---.--. .. ........
-----.-...-------------------------------.------ -----..----...-.........-----------------.. .-.... ....... ...    .
........ .---------------------------------------  --... ---......----.. . - ----------.--...-...  ......... ..
  ...    ..---------------.--.-------------...-.---------.. ....-......   --- --- ---.-----......             .
......    .-----.-.----------.---------------..--------.--......      . ..----------------.-..         ..
    .    ...--------------------------...----.--------.-..---.-.      .---------------------.          .                              `

const DOOM_ART = `########       ######       ######     ##      ##
##      ##   ##      ##   ##      ##   ####  ####
##      ##   ##      ##   ##      ##   ##  ##  ##
##      ##   ##      ##   ##      ##   ##  ##  ##
##      ##   ##      ##   ##      ##   ##      ##
##      ##   ##      ##   ##      ##   ##      ##
########       ######       ######     ##      ##`

type Phase = 'boot' | 'greet' | 'prompt' | 'exit'
type EggView = 'none' | 'moria' | 'balrog' | 'iddqd' | 'idkfa'

const EGG_ART: Record<Exclude<EggView, 'none'>, string> = {
  moria: DURIN_ART,
  balrog: BALROG_ART,
  iddqd: DOOM_ART,
  idkfa: DOOM_ART,
}

const EGG_CAPTIONS: Record<Exclude<EggView, 'none'>, string> = {
  moria: 'the doors of durin, lord of moria: speak, friend, and enter',
  balrog: 'a demon of the ancient world: YOU SHALL NOT PASS',
  iddqd: 'IDDQD - GOD MODE ON - degreelessness achieved',
  idkfa: 'IDKFA - armed to the teeth - all keys, all ammo',
}

const EGG_DURATION = 4200
const IDLE_TIMEOUT = 15000

export default function BootSequence({ onComplete, onReboot }: { onComplete: () => void; onReboot: () => void }) {
  const [visibleBoot, setVisibleBoot] = useState(0)
  const [visibleGreet, setVisibleGreet] = useState(0)
  const [phase, setPhase] = useState<Phase>('boot')
  const [cmd, setCmd] = useState('')
  const [eggView, setEggView] = useState<EggView>('none')
  const [eggBusy, setEggBusy] = useState(false)

  const doneRef = useRef(false)
  const phaseRef = useRef<Phase>('boot')
  const eggViewRef = useRef<EggView>('none')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { eggViewRef.current = eggView }, [eggView])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (idleTimer.current) clearTimeout(idleTimer.current)
    setPhase('exit')
    const t = setTimeout(onComplete, 380)
    timers.current.push(t)
  }

  const fastForward = () => {
    if (phaseRef.current === 'boot') setVisibleBoot(BOOT_LINES.length)
    else if (phaseRef.current === 'greet') setVisibleGreet(GREETING_LINES.length)
  }

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      if (phaseRef.current === 'prompt' && eggViewRef.current === 'none') finish()
    }, IDLE_TIMEOUT)
  }

  const triggerEgg = (view: Exclude<EggView, 'none'>) => {
    if (eggBusy) return
    setEggBusy(true)
    setEggView(view)
    const t = setTimeout(() => {
      setEggView('none')
      setCmd('')
      setEggBusy(false)
      resetIdleTimer()
      inputRef.current?.focus()
    }, EGG_DURATION)
    timers.current.push(t)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const reduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setVisibleBoot(BOOT_LINES.length)
      setVisibleGreet(GREETING_LINES.length)
      setPhase('prompt')
      return () => { document.body.style.overflow = '' }
    }

    let i = 0
    const stepBoot = () => {
      i += 1
      setVisibleBoot(i)
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i]
        const delay = line === '' ? 90 : 60 + Math.random() * 90
        timers.current.push(setTimeout(stepBoot, delay))
      } else {
        timers.current.push(setTimeout(() => setPhase('greet'), 450))
      }
    }
    timers.current.push(setTimeout(stepBoot, 240))

    overlayRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase !== 'greet') return
    let i = 0
    const stepGreet = () => {
      i += 1
      setVisibleGreet(i)
      if (i < GREETING_LINES.length) {
        timers.current.push(setTimeout(stepGreet, 950))
      } else {
        timers.current.push(setTimeout(() => setPhase('prompt'), 1900))
      }
    }
    timers.current.push(setTimeout(stepGreet, 300))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'prompt') return
    inputRef.current?.focus()
    resetIdleTimer()
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const handleOverlayClick = () => fastForward()
  const handleOverlayKeyDown = () => fastForward()

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || eggBusy) return
    const value = cmd.trim().toLowerCase()
    if (value === 'start') {
      finish()
      return
    } else if (value === 'mellon') {
      triggerEgg('moria')
    } else if (value === 'you shall not pass') {
      triggerEgg('balrog')
    } else if (value === 'iddqd') {
      triggerEgg('iddqd')
    } else if (value === 'idkfa') {
      triggerEgg('idkfa')
    } else if (value === 'reboot') {
      onReboot()
      return
    }
    setCmd('')
  }

  return (
    <div
      ref={overlayRef}
      className={`boot-overlay${phase === 'exit' ? ' boot-exit' : ''}`}
      role="status"
      aria-label="Loading Pietro Quintavalle's site"
      tabIndex={-1}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
    >
      <div className="boot-inner">
        <div className="boot-lines">
          {BOOT_LINES.slice(0, visibleBoot).map((line, idx) => (
            <div key={idx} className="boot-line">{line || ' '}</div>
          ))}
        </div>
        {phase !== 'boot' && (
          <div className="boot-greet">
            {GREETING_LINES.slice(0, visibleGreet).map((line, idx) => (
              <div key={idx} className="boot-greet-line">{line}</div>
            ))}
          </div>
        )}
        {phase === 'prompt' && (
          <div className="boot-prompt-stage">
            {eggView === 'none' ? (
              <div className="boot-cmd">
                <div className="boot-cmd-row">
                  <span className="boot-p">&#10148;</span> <span className="boot-c">~</span>
                  <input
                    ref={inputRef}
                    className="boot-input"
                    type="text"
                    value={cmd}
                    onChange={e => { setCmd(e.target.value); resetIdleTimer() }}
                    onKeyDown={handleInputKeyDown}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="boot command input"
                    disabled={eggBusy}
                  />
                </div>
                <div className="boot-hint">type <strong>start</strong> to enter, speak, friend, and enter&hellip;</div>
              </div>
            ) : (
              <div className="boot-egg">
                <div className="boot-ascii-scroll">
                  <pre className={`boot-ascii boot-ascii-${eggView}`}>{EGG_ART[eggView]}</pre>
                </div>
                <div className={`boot-egg-cap boot-egg-cap-${eggView}`}>{EGG_CAPTIONS[eggView]}</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="boot-skip">
        {phase === 'prompt' ? 'auto-launching soon if idle' : 'press any key to skip animation'}
      </div>
    </div>
  )
}
