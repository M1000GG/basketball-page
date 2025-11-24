import PropTypes from 'prop-types'

const StatsPanel = ({ stats }) => (
  <section className='stats-panel'>
    <div className='stats-panel__cards row g-3'>
      <div className='col-12 col-md-3'>
        <article className='stats-panel__card stats-panel__card--accent'>
          <p className='stats-panel__label'>Jugadores visibles</p>
          <p className='stats-panel__value'>{stats.total}</p>
          <small className='stats-panel__hint'>Después de filtros y búsqueda</small>
        </article>
      </div>
      <div className='col-12 col-md-3'>
        <article className='stats-panel__card'>
          <p className='stats-panel__label'>Promedio de puntos</p>
          <p className='stats-panel__value'>{stats.avgPoints}</p>
          <small className='stats-panel__hint'>PPG acumulado</small>
        </article>
      </div>
      <div className='col-12 col-md-3'>
        <article className='stats-panel__card'>
          <p className='stats-panel__label'>Promedio de rebotes</p>
          <p className='stats-panel__value'>{stats.avgRebounds}</p>
          <small className='stats-panel__hint'>REB por partido</small>
        </article>
      </div>
      <div className='col-12 col-md-3'>
        <article className='stats-panel__card stats-panel__card--highlight'>
          <p className='stats-panel__label'>Líder anotador</p>
          <p className='stats-panel__value'>{stats.topScorer.name}</p>
          <small className='stats-panel__hint'>
            {stats.topScorer.points} pts · {stats.topScorer.team}
          </small>
        </article>
      </div>
    </div>
  </section>
)

StatsPanel.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number,
    avgPoints: PropTypes.string,
    avgRebounds: PropTypes.string,
    topScorer: PropTypes.shape({
      name: PropTypes.string,
      points: PropTypes.string,
      team: PropTypes.string
    }),
    distribution: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.string,
        count: PropTypes.number,
        percentage: PropTypes.number
      })
    )
  }).isRequired
}

export default StatsPanel

