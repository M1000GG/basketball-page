import PropTypes from 'prop-types'

const PlayerRow = ({
  player,
  onClick,
  isFavorite,
  onToggleFavorite,
  darkMode,
  colorClass
}) => {
  const rowClassName = [
    'player-row',
    darkMode ? 'player-row--dark' : 'player-row--light',
    colorClass ? `player-row--${colorClass}` : ''
  ].join(' ').trim()

  const handleFavoriteClick = event => {
    event.stopPropagation()
    onToggleFavorite(player.id)
  }

  return (
    <tr className={rowClassName} onClick={() => onClick(player)}>
      <td>
        <button
          type='button'
          className={`player-row__favorite ${isFavorite ? 'player-row__favorite--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </td>
      <td>{player.jersey}</td>
      <td className='player-row__name'>
        <p className='player-row__name-title mb-0'>{player.name}</p>
        <small className='player-row__name-subtitle'>Altura {player.height} m</small>
      </td>
      <td>{player.team}</td>
      <td>{player.position}</td>
      <td>{player.points}</td>
      <td>{player.rebounds}</td>
      <td>{player.assists}</td>
      <td>{player.efficiency}</td>
      <td>{player.age}</td>
    </tr>
  )
}

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  colorClass: PropTypes.string
}

PlayerRow.defaultProps = {
  colorClass: ''
}

export default PlayerRow

