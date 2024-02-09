'use client'

import { useMemo, useState } from "react"
import ItemsAlbum from "./ItemsAlbum";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import Grid from '@mui/material/Unstable_Grid2';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.common.white, 0.10),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: 'fit-content',
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            '&:focus': {
                width: '24ch',
            },
        },
    },
}));

const sortItems = (selectedSortBy: string | undefined) => {
    if (selectedSortBy === 'z-a') {
        return (a: IItem, b: IItem) => b.title.toLowerCase().localeCompare(a.title);
    }

    if (selectedSortBy === 'low-high') {
        return (a: IItem, b: IItem) => a.price - b.price;
    }

    if (selectedSortBy === 'high-low') {
        return (a: IItem, b: IItem) => b.price - a.price;
    }

    return (a: IItem, b: IItem) => a.title.toLowerCase().localeCompare(b.title);

};


const priceValueText = (value: number) => {
    return `$${value}`;
}

const getMinMaxValues = (arr: IItem[]): [number, number] => {
    if (arr.length === 0) {
        return [0, 0];
    }

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let tmp;
    for (let i = arr.length - 1; i >= 0; i--) {
        tmp = arr[i].price;
        if (tmp < min) min = tmp;
        if (tmp > max) max = tmp;
    }
    return [min, max];
};


interface Props {
    items: Array<IItem>
}

const ItemsAlbumWrapper: React.FC<Props> = ({ items }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [min, max] = getMinMaxValues(items);

    const [priceRange, setPriceRange] = useState<number[]>([0, max])

    const [query, setQuery] = useState("");

    const itemsPerPage = 20;

    const [page, setPage] = useState(1);

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handlePriceRange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    }

    const [sortBy, setSortBy] = useState('a-z');

    const handleSortBy = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as string);
    };

    // Handling Filtering
    const filteredItems = useMemo(() => {
        setPage(1);
        return [...items].filter(i =>
            i.price >= priceRange[0]
            &&
            i.price <= priceRange[1]
            &&
            i.title.toLowerCase().includes(query.trim().toLowerCase())
        );
    }, [items, priceRange, query])

    // Handling Sorting
    const sortedItems = useMemo(() => {
        return [...filteredItems].sort(sortItems(sortBy));
    }, [filteredItems, sortBy])


    // Handling Pagination
    const pages = useMemo(
        () => Math.ceil(filteredItems.length / itemsPerPage),
        [filteredItems]
    );

    const itemsInView = useMemo(() => {
        const startItem = (itemsPerPage * page) - itemsPerPage;
        let endItem = itemsPerPage * (page);
        if (endItem > sortedItems.length) {
            endItem = sortedItems.length;
        }
        return sortedItems.slice(startItem, endItem)
    }, [page, sortedItems])

    return (

        <Box sx={{ flexGrow: 1 }} data-testid="items-album-wrapper">
            <AppBar position="relative" sx={{ py: 1 }} color="transparent" elevation={0}>
                <Grid component={Toolbar} container spacing={3} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {/* Filter Drawer */}
                    <Grid
                        xs={2}
                        sm={2}
                        md={4}
                        sx={{ order: { xs: 1, sm: 1 } }}
                        display="flex"
                        alignItems="center"
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => setIsDrawerOpen(true)}
                            data-testid="price-filter-btn"
                        >
                            <FilterAltIcon />
                        </IconButton>
                    </Grid>

                    {/* Search by Name Input */}
                    <Grid
                        xs={4}
                        sm={6}
                        md={4}
                        sx={{ order: { xs: 2, sm: 1 } }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search by Name…"
                                inputProps={{
                                    'aria-label': 'search',
                                    'data-testid': 'search-by-name'
                                }}
                                value={query}
                                onChange={handleQuery}
                            />
                        </Search>
                    </Grid>

                    {/* Sortby Dropdown Select */}
                    <Grid
                        xs={2}
                        sm={4}
                        md={4}
                        sx={{ order: { xs: 1, sm: 1 } }}
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                    >
                        <FormControl>
                            <InputLabel id="sortbyLabel">Sort By</InputLabel>
                            <Select
                                labelId="sortbyLabel"
                                label="Sort By"
                                id="sortby"
                                autoWidth
                                value={sortBy}
                                onChange={handleSortBy}
                                inputProps={{ 'data-testid': 'sort-items-dropdown' }}
                            >
                                <MenuItem value='a-z'>Alphabetically, A-Z</MenuItem>
                                <MenuItem value='z-a'>Alphabetically, Z-A</MenuItem>
                                <MenuItem value='low-high'>Price, low to high</MenuItem>
                                <MenuItem value='high-low'>Price, high to low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </AppBar>

            {/* Filter Drawer */}
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box
                    sx={{
                        minWidth: {
                            xs: "100vw",
                            sm: 400,
                        },
                        p: 4,
                    }}
                >
                    <Stack>
                        <Box>
                            <IconButton
                                sx={{ float: 'right' }}
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                        <Typography variant="h5" gutterBottom textAlign='center'>Filters</Typography>
                        <Divider />
                        <FormControl sx={{ py: 2 }}>
                            <Typography variant="subtitle1">Price</Typography>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={priceRange}
                                onChange={handlePriceRange}
                                valueLabelDisplay="off"
                                getAriaValueText={priceValueText}
                                min={0}
                                max={max}
                                step={1}
                                data-testid="price-filter-slider"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    variant="caption"
                                    sx={{ cursor: 'pointer' }}
                                >
                                    From: ${priceRange[0]}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ cursor: 'pointer' }}
                                >
                                    To: ${priceRange[1]}
                                </Typography>
                            </Box>
                        </FormControl>
                    </Stack>
                </Box>
            </Drawer>
            <ItemsAlbum items={itemsInView} />
            {
                pages > 1
                &&
                <Pagination
                    count={pages}
                    page={page}
                    onChange={handlePage}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2,
                        borderTop: 1,
                    }}
                />
            }
        </Box>

    )
}

export default ItemsAlbumWrapper;
