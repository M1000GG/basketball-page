import PropTypes from 'prop-types'

const ThemeToggle = ({ darkMode, onToggle }) => (
  <button type='button' className='theme-toggle' onClick={onToggle} aria-pressed={darkMode}>
    <span className='theme-toggle__icon' aria-hidden='true'>●</span>
    <span className='theme-toggle__label'>
      {darkMode ? 'Modo claro' : 'Modo oscuro'}
    </span>
  </button>
)

ThemeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default ThemeToggle

