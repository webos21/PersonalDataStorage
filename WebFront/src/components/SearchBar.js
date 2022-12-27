import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, InputBase, Paper } from '@mui/material';

const SearchBar = (props) => {
    const handleReset = (e) => {
        e.target.form.reset();
        props.onReset(e);
    };

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }} onSubmit={props.onSearchGo}>
            <InputBase
                name="searchKeyword"
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': props.placeholder }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {props.keyword && props.keyword.length > 0 && (
                <Button color="success" onClick={handleReset}>
                    전체보기
                </Button>
            )}
        </Paper>
    );
};

export default SearchBar;
