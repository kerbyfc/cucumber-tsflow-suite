import * as _ from 'lodash';

import {
    binding as $binging,
    given as $given,
    then as $then,
    when as $when
} from 'cucumber-tsflow/dist/index';

function buildComplexStepPattern(stepPatterns: RegExp[]): RegExp {
    return new RegExp(_.reduce(stepPatterns, (complexPattern, pattern, index) => {
        complexPattern += pattern.toString().slice(1, -1)
            .replace(/^\^/, '').replace(/\$$/, '').replace(/\\/g, '\\');
        return complexPattern + (index + 1 === stepPatterns.length ? '$' : '|');
    }, '^'));
}

/**
 * A method decorator that marks the associated function as a 'Given' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag.
 * @param timeout An optional timeout.
 */
export function given(stepPatterns: RegExp[], tag?: string, timeout?: number): MethodDecorator {
    const complexPattern = buildComplexStepPattern(stepPatterns);
    return $given(complexPattern, tag, timeout);
}
/**
 * A method decorator that marks the associated function as a 'When' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag.
 * @param timeout An optional timeout.
 */
export function when(stepPatterns: RegExp[], tag?: string, timeout?: number): MethodDecorator {
    const complexPattern = buildComplexStepPattern(stepPatterns);
    return $when(complexPattern, tag, timeout);
}
/**
 * A method decorator that marks the associated function as a 'Then' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag.
 * @param timeout An optional timeout.
 */
export function then(stepPatterns: RegExp[], tag?: string, timeout?: number): MethodDecorator {
    const complexPattern = buildComplexStepPattern(stepPatterns);
    return $then(complexPattern, tag, timeout);
}

export const binding = $binging;
