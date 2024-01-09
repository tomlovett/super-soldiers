import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp'

export const MissionIcon = () => <MilitaryTechIcon />

export const PromotionIcon = () => <DoubleArrowIcon color="warning" sx={{ transform: 'rotate(270deg)' }} />

export const RipIcon = () => <SentimentVeryDissatisfiedSharpIcon sx={{ color: 'red' }} />

export const SoldierIcon = () => <LocalPoliceIcon />
