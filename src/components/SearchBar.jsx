import PropTypes from 'prop-types'

const SearchBar = ({ value, onChange, onClear, resultsCount }) => {
  const handleInput = event => {
    onChange(event.target.value)
  }

  return (
    <div className='search-bar'>
      <div className='search-bar__row'>
        <div className='search-bar__input-wrapper'>
          <span className='search-bar__icon' aria-hidden='true'>🔍</span>
          <input
            type='search'
            className='search-bar__input'
            placeholder='Escribe un nombre o equipo...'
            value={value}
            onChange={handleInput}
          />
          {value && (
            <button
              type='button'
              className='search-bar__clear'
              onClick={onClear}
              aria-label='Limpiar búsqueda'
            >
              ×
            </button>
          )}
        </div>
        <span className='search-bar__badge'>
          Mostrando <strong>{resultsCount}</strong> resultados
        </span>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  resultsCount: PropTypes.number.isRequired
}

export default SearchBar

