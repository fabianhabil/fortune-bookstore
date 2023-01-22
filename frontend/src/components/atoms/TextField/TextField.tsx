import { makeStyles } from '@mui/styles';

export const textFieldStyles = makeStyles(() => ({
    inputTextfield: {
        input: { color: '#0D4066' },
        border: 'solid 1px white',
        borderRadius: '24px',
        backgroundColor: 'white',
        '& :-webkit-autofill': {
            transitionDelay: '999999999999999s'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '24px'
            },
            '&:hover fieldset': {
                borderRadius: '24px'
            },
            '&.Mui-focused fieldset': {
                borderRadius: '24px'
            }
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: 'transparent'
            },
        '& .MuiFormLabel-root': {
            display: 'flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            justifyContent: 'center',
            fontSize: '18px'
        }
    },
    inputTextFieldEvent: {
        fontFamily: 'Inter',
        input: {
            color: 'black'
        },
        '& :-webkit-autofill': {
            transitionDelay: '999999999999999s'
        },
        border: 'solid 1px black',
        borderRadius: '2px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '2px'
            },
            '&:hover fieldset': {
                borderRadius: '2px'
            },
            '&.Mui-focused fieldset': {
                borderRadius: '2px'
            }
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: 'transparent'
            }
    },
    inputTextFieldBlack: {
        fontFamily: 'Karla',
        input: {
            color: 'black'
        },
        '& :-webkit-autofill': {
            transitionDelay: '999999999999999s'
        },
        border: 'solid 1px black',
        borderRadius: '24px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '24px'
            },
            '&:hover fieldset': {
                borderRadius: '24px'
            },
            '&.Mui-focused fieldset': {
                borderRadius: '24px'
            }
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: 'transparent'
            }
    }
}));
