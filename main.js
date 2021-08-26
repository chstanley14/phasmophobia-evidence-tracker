$(document).ready(function() {
    // Check evidence box click event.
    $('input[type="checkbox"]').on('click', updateGhostTable);

    // Clear evidence click event.
    $('#clear-evidence').on('click', clearEvidence);

    // Update ghost description click event.
    $('#ghost-table th').on('click', function() {
        updateGhostDescription($(this));
    });
});

/**
 * Clear evidence table and reset ghost table.
 */
const clearEvidence = function() {
    const $checkboxes = $('input[type="checkbox"]');
    $checkboxes.prop('checked', false);
    $checkboxes.prop('disabled', false);
    $('#evidence-table tr').removeClass('row-disabled');
    updateGhostTable();
}

/**
 * Get all currently checked evidence.
 * @return {array} Array of checked evidence.
 */
const getCheckedEvidence = function() {
    let checkedEvidence = [];
    $('input[type="checkbox"]:checked').each(function() {
        checkedEvidence.push($(this).val());
    });

    return checkedEvidence;
}

/**
 * Update the ghost table to highlight possible ghosts.
 */
const updateGhostTable = function() {
    const ghostObject = getGhostObj();
    const ghostArray = Object.entries(ghostObject);
    const evidenceArray = getCheckedEvidence();
    let evidenceOptions = [];

    $('table tr').removeClass('row-active');
    $('table td').removeClass('lastEvidence');

    if (! evidenceArray.length) {
        return;
    }

    for (const [ghost, data] of ghostArray) {
        const $ghostRow = $('#row-' + ghost);
        const evidence = data.evidence;
        let hasAllEvidence = true;

        evidenceArray.forEach(function(e) {
            if (! evidence.includes(e)) {
                hasAllEvidence = false;
            }
        });

        if (hasAllEvidence) {
            evidenceOptions = evidenceOptions.concat(evidence);
            $ghostRow.addClass('row-active');

            if ($('input:checkbox:checked').length === 2) {

                $('input[type="checkbox"]:checkbox:not(":checked")').each(function(k, v) {
                    if ($ghostRow.find('td').hasClass('col-' + $(v).val())) {
                        $ghostRow.find('.col-' + $(v).val()).addClass('lastEvidence');
                    }
                });


            }
        }
    }

    const uniqueEvidence = new Set(evidenceOptions);
    evidenceOptions = [...uniqueEvidence];

    updateCheckBoxes(evidenceOptions);
}

/**
 * Enable/disable checkboxes depending on if the evidence is eligible based on remaining possible ghosts.
 * @param {array} evidenceOptions
 */
const updateCheckBoxes = function(evidenceOptions) {
    $('input[type=checkbox]').prop('disabled', true);
    $('#evidence-table tbody tr').addClass('row-disabled');

    evidenceOptions.forEach(function(e) {
        $checkbox = $('#check-' + e);
        $checkbox.prop('disabled', false);
        $checkbox.closest('tr').removeClass('row-disabled');
    });
}

/**
 * Updates the ghost description based on the passed in jQuery object.
 * @param {jQuery} e
 */
const updateGhostDescription = function(e) {
    const ghost = e.closest('tr').attr('id').substr(4);
    const ghostObject = getGhostObj();

    $('#ghost-name').text(capitalizeFirstLetter(ghost));
    $('#ghost-description').text(ghostObject[ghost].description);
    $('#ghost-strength').text(ghostObject[ghost].strength);
    $('#ghost-weakness').text(ghostObject[ghost].weakness);
}

/**
 * Returns ghost data object.
 * @return {object}
 */
const getGhostObj = function() {
    return {
        'spirit': {
            'evidence': [
                'emf',
                'spirit-box',
                'ghost-writing',
            ],
            'description': 'These are the most common ghosts you will come across but still they are powerful and dangerous. You can usually discover them at one of their hunting grounds after an unexplained death.',
            'strength': 'Nothing.',
            'weakness': 'Smudge Sticks to stop it from attacking for a long period of time.',
        },
        'wraith': {
            'evidence': [
                'spirit-box',
                'emf',
                'dots',
            ],
            'description': 'They are some of the most dangerous ghosts you will find. They are the only ghosts who can travel through walls and has the ability to fight.',
            'strength': 'They never touch the ground, so they can’t be tracked by footsteps..',
            'weakness': 'Wraiths have a toxic reaction to salt.',
        },
        'phantom': {
            'evidence': [
                'spirit-box',
                'fingerprints',
                'dots',
            ],
            'description': 'A phantom ghost can possess the living, and most commonly summoned through an Ouija Board. It also includes fear into those around it.',
            'strength': 'If you look at a phantom directly your sanity will drop faster.',
            'weakness': 'You can take a picture of the phantom to make it disappear.',
        },
        'poltergeist': {
            'evidence': [
                'spirit-box',
                'fingerprints',
                'ghost-writing',
            ],
            'description': 'The most famous ghost Poltergeist known to be a noisemaker by manipulating objects around them to instill fear among its victims.',
            'strength': 'Throw a huge amount of objects at once.',
            'weakness': 'Ineffective in an empty room as there will no objects to toss around.',
        },
        'banshee': {
            'evidence': [
                'fingerprints',
                'ghost-orbs',
                'dots',
            ],
            'description': 'These ghosts are natural hunters who love to stalk it’s prey one at a time making its kill. Banshee will attack anything that comes in its way.',
            'strength': 'Will target one persona at a time.',
            'weakness': 'Fears crucifix and will be less aggressive near one.',
        },
        'jinn': {
            'evidence': [
                'emf',
                'fingerprints',
                'freezing-temp',
            ],
            'description': 'These are territorial ghosts that will attack when they feel threatened. Jinn travels faster than most of the ghosts at a significant speed.',
            'strength': 'Will travel faster if the victim is far away.',
            'weakness': 'Turning off the location’s power source will prevent Jinn from using its ability.',
        },
        'mare': {
            'evidence': [
                'spirit-box',
                'ghost-writing',
                'ghost-orbs',
            ],
            'description': 'These ghosts are the source of all the nightmare the victims see, making it the most powerful ghost in the dark.',
            'strength': 'Increased chance to attack in the dark',
            'weakness': 'Turning the lights on around the Mare will lower its chance to attack.',
        },
        'revenant': {
            'evidence': [
                'ghost-orbs',
                'ghost-writing',
                'freezing-temp',
            ],
            'description': 'They are slow but violent ghosts that will attack everyone indiscriminately. They also travel at a greater speed like Jinn while hunting.',
            'strength': 'Travels faster while hunting.',
            'weakness': 'If you are hidden from the Revenant, their speed drops, and they travel slowly.',
        },
        'shade': {
            'evidence': [
                'ghost-writing',
                'emf',
                'freezing-temp',
            ],
            'description': 'These are shy ghosts and will stop all activity if there are more than one person nearby.',
            'strength': 'Harder to find.',
            'weakness': 'Not go into hunting mode if there are multiple people nearby.',
        },
        'demon': {
            'evidence': [
                'fingerprints',
                'ghost-writing',
                'freezing-temp',
            ],
            'description': 'These are the worst ghosts you can encounter. They will attack you without any reason.',
            'strength': 'Attacks more often than any other ghost.',
            'weakness': 'Asking a successful question on the Ouija board won’t lower sanity.',
        },
        'yurei': {
            'evidence': [
                'dots',
                'freezing-temp',
                'ghost-orbs',
            ],
            'description': 'They have returned to the physical world to take revenge or have a deep hatred for a victim.',
            'strength': 'Stronger effect on people’s sanity.',
            'weakness': 'Smudging the Yurei room will cause it to not wander around the location for a long time.',
        },
        'oni': {
            'evidence': [
                'freezing-temp',
                'dots',
                'emf',
            ],
            'description': 'Oni’s are the cousin of demons and are extremely strong. They will become more active if you wander around them for too long.',
            'strength': 'More active when players are nearby or when objects move at great speed.',
            'weakness': 'Being more active helps players to easily identify the Oni.',
        },
        'yokai': {
            'evidence': [
                'spirit-box',
                'dots',
                'ghost-orbs',
            ],
            'description': 'A Yokai is a common type of ghost that is attracted to human voices. They can usually be found haunting family homes.',
            'strength': 'Talking near a Yokai will anger it and increase it\'s chance of attacking.',
            'weakness': 'When hunting a Yokai can only hear voices close to it.',
        },
        'hantu': {
            'evidence': [
                'fingerprints',
                'freezing-temp',
                'ghost-orbs',
            ],
            'description': 'A Hantu is a rare ghost that can be found in hot climates. They are known to attack often during cold weather.',
            'strength': 'Lower temperatures can cause the Hantu to move at faster speeds.',
            'weakness': 'A Hantu will move slower in warmer areas.',
        },
        'goryo': {
            'evidence': [
                'emf',
                'fingerprints',
                'dots',
            ],
            'description': 'N/A',
            'strength': 'N/A',
            'weakness': 'N/A',
        },
        'myling': {
            'evidence': [
                'fingerprints',
                'emf',
                'ghost-writing',
            ],
            'description': 'N/A',
            'strength': 'N/A',
            'weakness': 'N/A',
        },
    }
}

/**
 * Utility function used to capitalize the first letter of a passed in string.
 * @param {string} word
 * @return {string}
 */
const capitalizeFirstLetter = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}