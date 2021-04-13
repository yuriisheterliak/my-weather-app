import { memo, useRef } from 'react';

import classes from './LocationForm.module.scss';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { ReactComponent as ClearIcon } from '../../../assets/images/clear.svg';
import LocationAutocomplete from './LocationAutocomplete/LocationAutocomplete';
import Button from '../../common/Button/Button';
import useClickOutside from '../../../hooks/useClickOutside';
import useFetchSuggestions from './hooks/useFetchSuggestions';

const LocationForm = memo(
  ({ inputValue, setInputValue, handleLocationSubmit, offline, error }) => {
    const {
      suggestions,
      clearSuggestions,
      cancelSuggestionsFetching,
    } = useFetchSuggestions(inputValue, offline);
    const formRef = useRef();

    useClickOutside(formRef, clearSuggestions, suggestions.length);

    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (offline) return;
      if (!inputValue || !inputValue.trim()) return;

      cancelSuggestionsFetching();
      clearSuggestions();
      handleLocationSubmit(inputValue);
    };

    const handleInputReset = () => {
      setInputValue('');
      clearSuggestions();
    };

    const formClasses = [classes.Form];
    if (error !== null) {
      formClasses.push(classes.FormInvalid);
    }

    return (
      <form
        ref={formRef}
        className={formClasses.join(' ')}
        onSubmit={handleOnSubmit}
      >
        <LocationAutocomplete
          suggestions={suggestions}
          clearSuggestions={clearSuggestions}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {inputValue ? (
          <Button
            attachedClass={classes.ClearButton}
            ariaLabel="Clear"
            title="Clear"
            onClick={handleInputReset}
          >
            <ClearIcon className={classes.Icon} />
          </Button>
        ) : null}
        <Button
          type="submit"
          attachedClass={classes.SearchButton}
          ariaLabel="Search"
          title="Search"
        >
          <SearchIcon className={classes.Icon} />
        </Button>
        {error !== null ? <span className={classes.Error}>{error}</span> : null}
      </form>
    );
  }
);

export default LocationForm;
