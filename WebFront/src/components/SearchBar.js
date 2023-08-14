import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';

const SearchBar = (props) => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: props.width ? props.width : '100%' }}
            onSubmit={props.onSearchGo}
        >
            <InputBase
                name="searchKeyword"
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': props.placeholder }}
            />
            <IconButton type="submit" sx={{ p: 2.8 }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
