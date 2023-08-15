import css from './filter.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersValue } from 'redux/filterSlice';
import { getFilters } from 'redux/selector';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilters);

  return (
    <div className={css.filterWrapper}>
      <input
        className={css.filter}
        name="filter"
        type="text"
        value={filterValue}
        onChange={e => dispatch(getFiltersValue(e.target.value))}
        placeholder="search"
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
