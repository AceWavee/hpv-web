
const appData = {
    mythsfacts: [
        { myth: "HPV only affects women", fact: "HPV affects both men and women and can cause cancers in both" },
        { myth: "HPV vaccine is only for young girls", fact: "Vaccine is recommended for both boys and girls, and adults up to age 45" },
        { myth: "You can get HPV from toilet seats", fact: "HPV spreads through skin-to-skin contact, not from surfaces" },
        { myth: "Condoms provide complete protection against HPV", fact: "Condoms reduce risk but don't provide 100% protection as HPV affects areas not covered" },
        { myth: "HPV always causes symptoms", fact: "Most HPV infections have no symptoms and clear on their own" },
        { myth: "HPV vaccine causes infertility", fact: "Multiple studies confirm HPV vaccines do not affect fertility" }
    ]
};


document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    populateMythsFacts();
    setupRiskAssessment();
    setupPreventionChecklist();
    setupFAQ();
    setupVaccinationFinder();
    setupSmoothScrolling();
    setupTimelineInteractions();
    setupCardHoverEffects();
    setupAccessibility();
    setupScrollAnimations();
    animateCounters();
}

// Navigation and Mobile Menu
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            if (navList.style.display === 'flex') {
                navList.style.display = 'none';
            } else {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.backgroundColor = '#ffffff';
                navList.style.boxShadow = '0 4px 6px rgba(34, 56, 67, 0.1)';
                navList.style.zIndex = '1000';
            }
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Smooth Scrolling for all internal links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Populate Myths vs Facts
function populateMythsFacts() {
    const mythsGrid = document.getElementById('mythsGrid');
    if (!mythsGrid) return;

    mythsGrid.innerHTML = '';

    appData.mythsfacts.forEach((item, index) => {
        const mythCard = document.createElement('div');
        mythCard.className = 'myth-card';
        mythCard.setAttribute('tabindex', '0');
        mythCard.setAttribute('role', 'button');
        mythCard.setAttribute('aria-label', 'Click to reveal fact');

        mythCard.innerHTML = `
            <div class="myth-content">
                <div class="myth-label">MYTH</div>
                <h4>Myth ${index + 1}</h4>
                <p class="myth-text">${item.myth}</p>
            </div>
            <div class="fact-content hidden">
                <div class="fact-label">FACT</div>
                <h4>Truth ${index + 1}</h4>
                <p class="fact-text">${item.fact}</p>
            </div>
        `;

        mythCard.addEventListener('click', function() {
            toggleMythCard(this);
        });

        mythCard.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMythCard(this);
            }
        });

        mythsGrid.appendChild(mythCard);
    });
}

function toggleMythCard(card) {
    const factContent = card.querySelector('.fact-content');
    const mythContent = card.querySelector('.myth-content');
    const isExpanded = card.classList.contains('expanded');

    // Close other cards first
    document.querySelectorAll('.myth-card.expanded').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            const otherFactContent = otherCard.querySelector('.fact-content');
            const otherMythContent = otherCard.querySelector('.myth-content');
            if (otherFactContent) {
                otherFactContent.classList.add('hidden');
                otherFactContent.classList.remove('visible');
            }
            if (otherMythContent) {
                otherMythContent.classList.remove('hidden');
                otherMythContent.classList.add('visible');
            }
        }
    });

    // Toggle current card
    if (isExpanded) {
        // Hide fact, show myth
        card.classList.remove('expanded');
        if (factContent) {
            factContent.classList.add('hidden');
            factContent.classList.remove('visible');
        }
        if (mythContent) {
            mythContent.classList.remove('hidden');
            mythContent.classList.add('visible');
        }
    } else {
        // Show fact, hide myth
        card.classList.add('expanded');
        if (factContent) {
            factContent.classList.remove('hidden');
            factContent.classList.add('visible');
        }
        if (mythContent) {
            mythContent.classList.add('hidden');
            mythContent.classList.remove('visible');
        }
    }
}

// Risk Assessment Setup
function setupRiskAssessment() {
    const assessmentForm = document.getElementById('riskAssessmentForm');
    if (!assessmentForm) return;

    const newForm = assessmentForm.cloneNode(true);
    assessmentForm.parentNode.replaceChild(newForm, assessmentForm);

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(this);
        const age = formData.get('age');
        const vaccination = formData.get('vaccination');
        const screening = formData.get('screening');
        const riskFactors = formData.getAll('risk-factors');

        if (!age || !vaccination || !screening) {
            alert('Please fill out all required fields before submitting.');
            return false;
        }

        const recommendations = generateRecommendations(age, vaccination, screening, riskFactors);
        displayAssessmentResults(recommendations);

        return false; // Additional prevention of form submission
    });
}

function generateRecommendations(age, vaccination, screening, riskFactors) {
    const recommendations = [];

    // Vaccination recommendations
    if (vaccination === 'not-vaccinated' || vaccination === 'partially-vaccinated') {
        if (age === 'under-18' || age === '18-26') {
            recommendations.push('Get HPV vaccination immediately - you are in the ideal age group for maximum protection');
        } else if (age === '27-45') {
            recommendations.push('Discuss HPV vaccination with your healthcare provider - may still provide benefits');
        } else {
            recommendations.push('Discuss HPV vaccination with your healthcare provider to assess potential benefits');
        }
    } else if (vaccination === 'fully-vaccinated') {
        recommendations.push('Excellent! You are protected against the most dangerous HPV types');
    } else if (vaccination === 'unknown') {
        recommendations.push('Check your vaccination records and consider getting vaccinated if not up to date');
    }

    // Screening recommendations
    if (screening === 'never' || screening === 'overdue') {
        if (age !== 'under-18') {
            recommendations.push('Schedule cervical cancer screening (Pap test/HPV test) with your healthcare provider immediately');
        }
    } else if (screening === 'regular') {
        recommendations.push('Great job maintaining regular screening! Continue as recommended by your doctor');
    }

    // Risk factor specific recommendations
    if (riskFactors.includes('smoking')) {
        recommendations.push('Quit smoking to reduce HPV-related cancer risk and improve immune function');
    }
    if (riskFactors.includes('multiple-partners')) {
        recommendations.push('Practice safe sex consistently and consider limiting sexual partners');
    }
    if (riskFactors.includes('immunocompromised')) {
        recommendations.push('Work closely with your healthcare team for personalized screening and prevention plan');
    }
    if (riskFactors.includes('other-stis')) {
        recommendations.push('Get tested and treated for STIs, as they can increase HPV transmission risk');
    }

    return recommendations;
}

function displayAssessmentResults(recommendations) {
    const resultsDiv = document.getElementById('assessmentResults');
    if (!resultsDiv) return;

    let resultsHTML = '<h3>🎯 Based on your responses, here are your personalized recommendations:</h3>';
    resultsHTML += '<ul class="recommendations-list">';

    recommendations.forEach(rec => {
        resultsHTML += `<li>📌 ${rec}</li>`;
    });

    resultsHTML += '</ul>';
    resultsHTML += '<p><strong>💡 Remember:</strong> These recommendations are general guidance. Always consult with your healthcare provider for personalized medical advice.</p>';

    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Prevention Checklist Setup
function setupPreventionChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');

    checklistItems.forEach(item => {
        item.addEventListener('change', function() {
            const listItem = this.closest('.checklist-item');
            if (this.checked) {
                listItem.classList.add('completed');
                // Optional: Save progress to localStorage
                localStorage.setItem(this.id, 'true');
            } else {
                listItem.classList.remove('completed');
                localStorage.removeItem(this.id);
            }
            updateProgress();
        });

        // Load saved state
        if (localStorage.getItem(item.id) === 'true') {
            item.checked = true;
            item.closest('.checklist-item').classList.add('completed');
        }
    });

    updateProgress();
}

function updateProgress() {
    const totalItems = document.querySelectorAll('.checklist-item input[type="checkbox"]').length;
    const completedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    if (progressBar && progressText) {
        const percentage = (completedItems / totalItems) * 100;
        progressBar.style.width = percentage + '%';
        progressText.textContent = `${completedItems}/${totalItems} completed (${Math.round(percentage)}%)`;
    }
}

// FAQ Setup
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                toggleFAQ(item);
            });

            question.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(item);
                }
            });
        }
    });
}

function toggleFAQ(item) {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    const isActive = item.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-item.active').forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            otherItem.querySelector('.faq-icon').textContent = '+';
        }
    });

    if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.textContent = '+';
    } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    }
}


console.log('🚀 Enhanced HPV Vaccination Finder loading...');

//  find vaccination centers
async function findCenters() {
    console.log('🔍 Starting HPV vaccination center search...');

    const locationInput = document.getElementById('locationInput');
    const centerResults = document.getElementById('centerResults');

    // Validate required elements
    if (!locationInput) {
        alert('Location input field not found. Please ensure your HTML has <input id="locationInput">');
        return;
    }

    if (!centerResults) {
        alert('Results container not found. Please ensure your HTML has <div id="centerResults">');
        return;
    }

    const location = locationInput.value.trim();
    if (!location) {
        alert('Please enter a city name, PIN code, or address to search for vaccination centers.');
        locationInput.focus();
        return;
    }

    console.log('🔍 Searching for:', location);

    // Show loading state
    showLoadingState(centerResults);

    try {
        
        const coordinates = await geocodeLocation(location);
        if (!coordinates) {
            throw new Error('Location not found. Please try a different city name, PIN code, or address.');
        }

        console.log('✅ Location found:', coordinates);

        
        const facilities = await searchHPVFacilities(coordinates, location);

        if (facilities.length === 0) {
            displayNoResults(centerResults, location);
        } else {
            console.log(`✅ Found ${facilities.length} healthcare facilities`);
            displayResults(centerResults, facilities, location);
        }

    } catch (error) {
        console.error('❌ Search error:', error);
        displayError(centerResults, error.message);
    }
}

// geo-location
async function geocodeLocation(location) {
    try {
        let searchLocation = location;

        // Handle PIN codes
        if (/^\d{6}$/.test(location.trim())) {
            searchLocation = location.trim() + ' India';
        }
        
        else if (!searchLocation.toLowerCase().includes('india')) {
            searchLocation += ', India';
        }

        console.log('🗺️ Geocoding:', searchLocation);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(searchLocation)}`,
            {
                headers: {
                    'User-Agent': 'HPV-Prevention-Website/2.0'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding service temporarily unavailable');
        }

        const data = await response.json();
        console.log('📍 Geocoding results:', data.length);

        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }

        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

async function searchHPVFacilities(coordinates, locationName) {
    try {
        const { lat, lng } = coordinates;
        const radius = 15000; 

        
        const overpassQuery = `
        [out:json][timeout:25];
        (
          // Vaccination centers - highest priority
          node["healthcare"="vaccination"](around:${radius},${lat},${lng});
          way["healthcare"="vaccination"](around:${radius},${lat},${lng});

          // Hospitals - likely to have vaccines
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          way["amenity"="hospital"](around:${radius},${lat},${lng});

          // Healthcare hospitals
          node["healthcare"="hospital"](around:${radius},${lat},${lng});
          way["healthcare"="hospital"](around:${radius},${lat},${lng});

          // Clinics and medical centers
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          way["amenity"="clinic"](around:${radius},${lat},${lng});
          node["healthcare"="clinic"](around:${radius},${lat},${lng});
          way["healthcare"="clinic"](around:${radius},${lat},${lng});

          // Healthcare centers
          node["healthcare"="centre"](around:${radius},${lat},${lng});
          way["healthcare"="centre"](around:${radius},${lat},${lng});

          // Government health centers
          node["amenity"="health_centre"](around:${radius},${lat},${lng});
          way["amenity"="health_centre"](around:${radius},${lat},${lng});

          // Women's health facilities
          node["healthcare"="birthing_centre"](around:${radius},${lat},${lng});
          way["healthcare"="birthing_centre"](around:${radius},${lat},${lng});

          // Doctor offices
          node["amenity"="doctors"](around:${radius},${lat},${lng});
          way["amenity"="doctors"](around:${radius},${lat},${lng});
        );
        out center;
        `;

        console.log('🏥 Querying healthcare facilities...');

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'HPV-Prevention-Website/2.0'
            },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
            throw new Error('Healthcare facility search service temporarily unavailable');
        }

        const data = await response.json();
        console.log('📊 Raw facility data:', data.elements?.length || 0);

        if (!data.elements || data.elements.length === 0) {
            return [];
        }

        // Process and prioritize facilities for HPV vaccination likelihood
        const facilities = data.elements.map(element => {
            const tags = element.tags || {};
            const elementLat = element.lat || element.center?.lat;
            const elementLon = element.lon || element.center?.lon;

            if (!elementLat || !elementLon) return null;

            const name = tags.name || tags['name:en'] || tags['name:hi'] || 'Healthcare Facility';
            const distance = calculateDistance(lat, lng, elementLat, elementLon);
            const priority = calculateHPVPriority(tags, name);

            return {
                id: element.id,
                name: name,
                type: determineHPVFacilityType(tags, name),
                address: formatAddress(tags),
                phone: tags.phone || tags['contact:phone'] || 'Phone not available',
                website: tags.website || tags['contact:website'] || null,
                lat: elementLat,
                lng: elementLon,
                distance: distance,
                priority: priority,
                isGovernment: isGovernmentFacility(tags, name),
                operator: tags.operator || null
            };
        }).filter(f => f !== null);

        
        facilities.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority; 
            }
            return a.distance - b.distance;
        });

        console.log('✅ Processed and prioritized facilities:', facilities.length);
        return facilities.slice(0, 10); 

    } catch (error) {
        console.error('Healthcare facility search error:', error);
        throw error;
    }
}

// Calculate HPV vaccination priority score
function calculateHPVPriority(tags, name) {
    let priority = 0;
    const nameLC = name.toLowerCase();
    const healthcare = tags.healthcare || '';
    const amenity = tags.amenity || '';
    const operator = (tags.operator || '').toLowerCase();
    const specialty = (tags['healthcare:speciality'] || '').toLowerCase();

    if (healthcare === 'vaccination' || nameLC.includes('vaccination') || nameLC.includes('immunization')) {
        priority += 100;
    }

    if (nameLC.includes('hpv') || nameLC.includes('cervical') || 
        nameLC.includes('gardasil') || nameLC.includes('cervavac')) {
        priority += 90;
    }

    if (nameLC.includes('women') || nameLC.includes('maternity') || 
        nameLC.includes('gynecology') || nameLC.includes('obstetric') ||
        specialty.includes('gynecology') || specialty.includes('obstetrics') ||
        healthcare === 'birthing_centre') {
        priority += 75;
    }

    if (tags['operator:type'] === 'government' || 
        nameLC.includes('government') || nameLC.includes('district') ||
        nameLC.includes('municipal') || nameLC.includes('corporation') ||
        nameLC.includes('phc') || nameLC.includes('chc') ||
        nameLC.includes('primary health') || nameLC.includes('community health') ||
        operator.includes('government') || operator.includes('public')) {
        priority += 65;
    }

    if (amenity === 'hospital' || healthcare === 'hospital') {
        if (nameLC.includes('medical college') || nameLC.includes('institute') ||
            nameLC.includes('aiims') || nameLC.includes('multi') ||
            nameLC.includes('super') || nameLC.includes('teaching')) {
            priority += 55;
        } else {
            priority += 45;
        }
    }

    if (amenity === 'clinic' || healthcare === 'clinic') {
        priority += 35;
    }

    // Doctor offices
    if (amenity === 'doctors') {
        priority += 25;
    }

    if (tags.emergency === 'yes') {
        priority += 15;
    }

    // Known healthcare chains
    const knownChains = ['apollo', 'fortis', 'max', 'manipal', 'narayana', 'aster', 'care', 'cloudnine'];
    if (knownChains.some(chain => nameLC.includes(chain) || operator.includes(chain))) {
        priority += 20;
    }

    return priority;
}


function determineHPVFacilityType(tags, name) {
    const nameLC = name.toLowerCase();
    const healthcare = tags.healthcare || '';
    const amenity = tags.amenity || '';

    if (healthcare === 'vaccination' || nameLC.includes('vaccination') || nameLC.includes('immunization')) {
        return 'Vaccination Center';
    } else if (nameLC.includes('women') || nameLC.includes('gynecology') || 
               nameLC.includes('maternity') || healthcare === 'birthing_centre') {
        return "Women's Health";
    } else if (amenity === 'hospital' || healthcare === 'hospital') {
        return 'Hospital';
    } else if (amenity === 'clinic' || healthcare === 'clinic') {
        return 'Clinic';
    } else if (amenity === 'doctors') {
        return 'Medical Practice';
    } else if (healthcare === 'centre' || amenity === 'health_centre') {
        return 'Health Center';
    } else {
        return 'Healthcare Facility';
    }
}


function isGovernmentFacility(tags, name) {
    const nameLC = name.toLowerCase();
    const operator = (tags.operator || '').toLowerCase();

    return tags['operator:type'] === 'government' ||
           nameLC.includes('government') || nameLC.includes('district') ||
           nameLC.includes('municipal') || nameLC.includes('corporation') ||
           nameLC.includes('phc') || nameLC.includes('chc') ||
           nameLC.includes('primary health') || nameLC.includes('community health') ||
           operator.includes('government') || operator.includes('public');
}

// Helper fn
function formatAddress(tags) {
    const parts = [];
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:locality'] || tags['addr:suburb']) {
        parts.push(tags['addr:locality'] || tags['addr:suburb']);
    }
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:state']) parts.push(tags['addr:state']);

    return parts.length > 0 ? parts.join(', ') : 'Address not available';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Display fn
function showLoadingState(container) {
    container.classList.remove('hidden');
    container.innerHTML = `
        <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px; margin: 20px 0; border: 1px solid #dee2e6;">
            <div style="width: 40px; height: 40px; border: 4px solid #e3f2fd; border-top: 4px solid #2196F3; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="color: #223843; margin-bottom: 10px;">🔍 Searching for HPV Vaccination Centers...</h3>
            <p style="color: #666; margin: 0;">Please wait while we find healthcare facilities near you that may offer HPV vaccines.</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
}

function displayResults(container, facilities, location) {
    let html = `
        <div style="text-align: center; margin-bottom: 25px; padding: 20px; background: #e8f5e8; border-radius: 8px;">
            <h3 style="color: #2e7d32; margin-bottom: 10px;">🏥 Found ${facilities.length} Healthcare Facilities near ${location}</h3>
            <p style="color: #555; margin: 0; font-style: italic;">
                Results are prioritized by likelihood to offer HPV vaccines. Government facilities and women's health centers are given higher priority.
            </p>
        </div>
    `;

    facilities.forEach(facility => {
        const priorityBadge = getPriorityBadge(facility.priority);
        const typeColor = getTypeColor(facility.type);
        const distance = facility.distance.toFixed(1);

        html += `
        <div style="background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.3s ease;" 
             onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';">

            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                <h4 style="margin: 0; color: #223843; font-size: 1.3rem; flex: 1; min-width: 200px;">${facility.name}</h4>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span style="background: ${typeColor}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${facility.type}</span>
                    ${priorityBadge}
                    ${facility.isGovernment ? '<span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">GOVT</span>' : ''}
                </div>
            </div>

            <div style="margin-bottom: 20px; line-height: 1.6;">
                <p style="margin: 8px 0; color: #555; display: flex; align-items: center;">
                    <span style="margin-right: 10px; font-size: 1.1em;">📍</span> ${facility.address}
                </p>
                <p style="margin: 8px 0; color: #555; display: flex; align-items: center;">
                    <span style="margin-right: 10px; font-size: 1.1em;">📏</span> <strong>${distance} km</strong> away
                </p>
                <p style="margin: 8px 0; color: #555; display: flex; align-items: center;">
                    <span style="margin-right: 10px; font-size: 1.1em;">📞</span> ${facility.phone}
                </p>
                ${facility.website ? `<p style="margin: 8px 0; color: #555; display: flex; align-items: center;">
                    <span style="margin-right: 10px; font-size: 1.1em;">🌐</span> <a href="${facility.website}" target="_blank" style="color: #2196F3; text-decoration: none;">Visit Website</a>
                </p>` : ''}
                ${facility.operator ? `<p style="margin: 8px 0; color: #666; font-size: 0.9rem; font-style: italic; display: flex; align-items: center;">
                    <span style="margin-right: 10px; font-size: 1.1em;">🏢</span> Operated by: ${facility.operator}
                </p>` : ''}
            </div>

            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button style="flex: 1; min-width: 150px; padding: 14px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; font-weight: 600; background: #2196F3; color: white; transition: all 0.3s ease;" 
                        onclick="getDirections(${facility.lat}, ${facility.lng}, '${facility.name.replace(/'/g, "\'")}');"
                        onmouseover="this.style.background='#1976D2';" 
                        onmouseout="this.style.background='#2196F3';">
                    🗺️ Get Directions
                </button>
                <button style="flex: 1; min-width: 150px; padding: 14px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; font-weight: 600; background: #4CAF50; color: white; transition: all 0.3s ease;" 
                        onclick="callFacility('${facility.phone}');"
                        onmouseover="this.style.background='#45a049';" 
                        onmouseout="this.style.background='#4CAF50';">
                    📞 Call Now
                </button>
            </div>
        </div>
        `;
    });

    html += `
    <div style="background: linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%); border: 1px solid #bee5eb; border-radius: 12px; padding: 25px; margin-top: 30px;">
        <h4 style="margin: 0 0 15px 0; color: #0c5460; display: flex; align-items: center;">
            <span style="margin-right: 10px; font-size: 1.2em;">📋</span> Important HPV Vaccination Information
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin: 15px 0;">
            <div>
                <h5 style="color: #0c5460; margin: 0 0 8px 0;">Before You Go:</h5>
                <ul style="margin: 0; padding-left: 20px; color: #0c5460; line-height: 1.6;">
                    <li><strong>Call ahead</strong> to confirm HPV vaccine availability</li>
                    <li><strong>Ask about appointments</strong> - some require booking</li>
                    <li><strong>Verify age requirements</strong> - ideal for 9-26 years</li>
                </ul>
            </div>
            <div>
                <h5 style="color: #0c5460; margin: 0 0 8px 0;">What to Bring:</h5>
                <ul style="margin: 0; padding-left: 20px; color: #0c5460; line-height: 1.6;">
                    <li><strong>ID proof</strong> and address proof</li>
                    <li><strong>Previous vaccination records</strong> if available</li>
                    <li><strong>Insurance information</strong> or payment method</li>
                </ul>
            </div>
        </div>
        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="margin: 0; color: #0c5460; font-size: 0.95rem; line-height: 1.6;">
                <strong>💡 Cost Tip:</strong> Government hospitals, PHCs, and women's health centers typically offer HPV vaccines at subsidized rates. 
                Available vaccines in India include <strong>Gardasil 9, Cervavac, and Cervarix</strong>.
            </p>
        </div>
    </div>
    `;

    container.innerHTML = html;
}

function getPriorityBadge(priority) {
    if (priority >= 85) {
        return '<span style="background: linear-gradient(45deg, #ff9800, #f57c00); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">🔥 HIGH PRIORITY</span>';
    } else if (priority >= 60) {
        return '<span style="background: linear-gradient(45deg, #2196f3, #1976d2); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">👍 RECOMMENDED</span>';
    } else if (priority >= 35) {
        return '<span style="background: linear-gradient(45deg, #4caf50, #388e3c); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">✅ GOOD OPTION</span>';
    }
    return '<span style="background: #757575; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">📋 AVAILABLE</span>';
}

function getTypeColor(type) {
    const colors = {
        'Vaccination Center': '#ff9800',
        "Women's Health": '#e91e63',
        'Hospital': '#f44336',
        'Clinic': '#4CAF50',
        'Medical Practice': '#9c27b0',
        'Health Center': '#2196F3',
        'Healthcare Facility': '#607d8b'
    };
    return colors[type] || '#607d8b';
}

function displayNoResults(container, location) {
    container.innerHTML = `
    <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border: 1px solid #ffcc02; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 15px;">🔍</div>
        <h3 style="color: #ef6c00; margin-bottom: 15px;">No healthcare facilities found near "${location}"</h3>
        <p style="color: #bf360c; margin: 15px 0; font-size: 1.1rem;">This could mean:</p>
        <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; text-align: left; display: inline-block; margin: 20px 0;">
            <ul style="color: #bf360c; margin: 0; line-height: 1.8;">
                <li>The location name wasn't recognized</li>
                <li>Try a nearby major city name instead</li>
                <li>Use your 6-digit PIN code for better results</li>
                <li>Limited healthcare facilities are mapped online in this area</li>
            </ul>
        </div>

        <div style="text-align: left; display: inline-block; margin-top: 25px;">
            <h4 style="color: #ef6c00; margin-bottom: 15px;">💡 Try these search terms:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: rgba(255,255,255,0.9); padding: 15px; border-radius: 8px;">
                    <h5 style="color: #bf360c; margin: 0 0 8px 0;">Major Cities:</h5>
                    <p style="color: #bf360c; margin: 0; font-size: 0.9rem;">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune</p>
                </div>
                <div style="background: rgba(255,255,255,0.9); padding: 15px; border-radius: 8px;">
                    <h5 style="color: #bf360c; margin: 0 0 8px 0;">PIN Codes:</h5>
                    <p style="color: #bf360c; margin: 0; font-size: 0.9rem;">Your area's 6-digit postal code (e.g., 400001, 110001)</p>
                </div>
                <div style="background: rgba(255,255,255,0.9); padding: 15px; border-radius: 8px;">
                    <h5 style="color: #bf360c; margin: 0 0 8px 0;">Landmarks:</h5>
                    <p style="color: #bf360c; margin: 0; font-size: 0.9rem;">[City] Medical College, [City] District Hospital</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function displayError(container, message) {
    container.innerHTML = `
    <div style="background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border: 1px solid #f44336; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 15px;">⚠️</div>
        <h3 style="color: #c62828; margin-bottom: 15px;">Search Error</h3>
        <p style="color: #d32f2f; margin: 15px 0; font-size: 1.1rem;">We encountered an issue while searching:</p>
        <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #d32f2f; font-style: italic; margin: 0; font-size: 1.05rem;">"${message}"</p>
        </div>

        <div style="text-align: left; display: inline-block; margin-top: 25px;">
            <h4 style="color: #c62828; margin-bottom: 15px;">🔄 What to try:</h4>
            <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px;">
                <ul style="color: #d32f2f; margin: 0; line-height: 1.8;">
                    <li><strong>Check internet connection</strong> and try again</li>
                    <li><strong>Use a different location format</strong> (city name vs PIN code)</li>
                    <li><strong>Try a major city near you</strong> for better results</li>
                    <li><strong>Wait a moment</strong> and search again</li>
                </ul>
            </div>
        </div>

        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            🔄 Refresh Page & Try Again
        </button>
    </div>
    `;
}

// Action fn
function getDirections(lat, lng, name) {
    console.log('🗺️ Opening directions for:', name);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

function callFacility(phone) {
    console.log('📞 Attempting to call:', phone);
    if (phone && phone !== 'Phone not available') {
        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        if (cleanPhone) {
            window.location.href = `tel:${cleanPhone}`;
        } else {
            alert('Phone number format not recognized. Please dial manually: ' + phone);
        }
    } else {
        alert('Phone number not available for this facility. Please visit in person or search online for contact information.');
    }
}

// vccn finder
function setupVaccinationFinder() {
    console.log('📱 Setting up vaccination finder...');
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                findCenters();
            }
        });
        console.log('✅ Enter key listener added to location input');
    } else {
        console.warn('⚠️ locationInput not found in DOM');
    }
}

// Timeline Interactions
function setupTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Card Hover Effects
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .prevention-card, .resource-card, .support-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(34, 56, 67, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(34, 56, 67, 0.1)';
        });
    });
}

// Accessibility Setup
function setupAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, [role="button"]');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Add ARIA labels to form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        const label = element.previousElementSibling || element.parentElement.querySelector('label');
        if (label && label.tagName === 'LABEL') {
            const labelText = label.textContent;
            if (!element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', labelText);
            }
        }
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.about-card, .prevention-card, .tool-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter Animation
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }

function animateCounter(element) {
    const text = element.textContent.trim();
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');

    if (isNaN(number)) return;

    let current = 0;
    const increment = Math.ceil(number / 50);
    const stepTime = 40;

    element.textContent = '0' + suffix;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = current + suffix;
    }, stepTime);
}
        });
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.findCenters = findCenters;
window.getDirections = getDirections;
window.callFacility = callFacility;

console.log('✅ Enhanced HPV Prevention Website loaded successfully!');
console.log('🔍 Enhanced HPV vaccination finder ready with smart prioritization!');
