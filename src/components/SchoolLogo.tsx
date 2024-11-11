import schoolLogo from '../assets/school-logo.png';

const SchoolLogo = () => {
    return (
        <img 
            src={schoolLogo}
            alt="School Logo"
            style={{ 
                display: 'block', 
                margin: '20px auto',
                maxWidth: '200px',
                height: 'auto'
            }}
        />
    );
};

export default SchoolLogo; 