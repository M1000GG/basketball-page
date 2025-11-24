import PropTypes from 'prop-types'

const PlayerModal = ({ isOpen, player, onClose, darkMode }) => {
  if (!isOpen || !player) return null

  return (
    <div className='player-modal__overlay player-modal__overlay--visible' onClick={onClose}>
      <div
        className={`player-modal ${darkMode ? 'player-modal--dark' : 'player-modal--light'}`}
        onClick={event => event.stopPropagation()}
      >
        <button type='button' className='player-modal__close' onClick={onClose} aria-label='Cerrar modal'>
          ×
        </button>
        <p className='player-modal__role'>{player.position}</p>
        <h3 className='player-modal__name'>{player.name}</h3>
        <p className='player-modal__team'>{player.team}</p>
        <div className='player-modal__stats row g-3'>
          <div className='col-6 col-md-3'>
            <div className='player-modal__stat'>
              <p className='player-modal__stat-label'>PTS</p>
              <p className='player-modal__stat-value'>{player.points}</p>
            </div>
          </div>
          <div className='col-6 col-md-3'>
            <div className='player-modal__stat'>
              <p className='player-modal__stat-label'>REB</p>
              <p className='player-modal__stat-value'>{player.rebounds}</p>
            </div>
          </div>
          <div className='col-6 col-md-3'>
            <div className='player-modal__stat'>
              <p className='player-modal__stat-label'>AST</p>
              <p className='player-modal__stat-value'>{player.assists}</p>
            </div>
          </div>
          <div className='col-6 col-md-3'>
            <div className='player-modal__stat'>
              <p className='player-modal__stat-label'>Eficiencia</p>
              <p className='player-modal__stat-value'>{player.efficiency}</p>
            </div>
          </div>
        </div>
        <div className='player-modal__details'>
          <p>Edad: {player.age} años</p>
          <p>Altura: {player.height} m · Peso: {player.weight} kg</p>
          <p>Experiencia: {player.experience} temporadas</p>
          <p>País: {player.country}</p>
        </div>
        <p className='player-modal__description'>{player.description}</p>
      </div>
    </div>
  )
}

PlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  player: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
}

PlayerModal.defaultProps = {
  player: null
}

export default PlayerModal

