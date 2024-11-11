const NlognLogo = () => {
    const logoPath = `${import.meta.env.BASE_URL}nlogn.svg`;
    
    return (
        <img 
            src={logoPath}
            alt="nlogn Logo"
            style={{ 
                display: 'block', 
                margin: '20px auto',
                maxWidth: '200px',
                height: 'auto'
            }}
        />
    );
};

export default NlognLogo; 