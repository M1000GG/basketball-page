import PropTypes from 'prop-types'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const buildPageNumbers = () => {
    const visibleButtons = 5
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + visibleButtons - 1)

    if (end - start < visibleButtons - 1) {
      start = Math.max(1, end - visibleButtons + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  const pageNumbers = buildPageNumbers()

  return (
    <div className='pagination-controls'>
      <div className='pagination-controls__summary'>
        Mostrando {startItem}-{endItem} de {totalItems} registros
      </div>
      <div className='pagination-controls__actions'>
        <div className='pagination-controls__per-page'>
          <label htmlFor='itemsPerPage' className='form-label mb-0'>
            Mostrar
          </label>
          <select
            id='itemsPerPage'
            className='form-select'
            value={itemsPerPage}
            onChange={event => onItemsPerPageChange(Number(event.target.value))}
          >
            {[5, 10, 20].map(option => (
              <option key={option} value={option}>
                {option} por página
              </option>
            ))}
          </select>
        </div>
        <div className='pagination-controls__buttons'>
          <button
            type='button'
            className='pagination-controls__btn'
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label='Ir a la primera página'
          >
            «
          </button>
          <button
            type='button'
            className='pagination-controls__btn'
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label='Ir a la página anterior'
          >
            ‹
          </button>
          {pageNumbers.map(number => (
            <button
              type='button'
              key={number}
              className={`pagination-controls__btn ${number === currentPage ? 'pagination-controls__btn--active' : ''}`}
              onClick={() => onPageChange(number)}
              aria-label={`Ir a la página ${number}`}
            >
              {number}
            </button>
          ))}
          <button
            type='button'
            className='pagination-controls__btn'
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label='Ir a la página siguiente'
          >
            ›
          </button>
          <button
            type='button'
            className='pagination-controls__btn'
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label='Ir a la última página'
          >
            »
          </button>
        </div>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired
}

export default Pagination

