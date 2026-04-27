import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import { useTranslation } from '../hooks/useTranslation.jsx'
import i18n from '../i18n'

function LanguageSwitcher() {
  const { locale, setLocale, availableLocales } = useTranslation()

  const handleChange = (event) => {
    setLocale(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" fullWidth>
        <Select
          value={locale}
          onChange={handleChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">{value.toUpperCase()}</Typography>
            </Box>
          )}
        >
          {availableLocales.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSwitcher