<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class ExistInDatabase implements ValidationRule
{
    public function __construct(
        protected $table,
        protected $column
    ) {
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $valueVal = json_decode($value, true);
        $existingIds = DB::table($this->table)
            ->whereIn($this->column, $valueVal)
            ->count();
        if (count(array_unique($valueVal)) !== $existingIds) {
            $fail('The :attribute have "id" not found.');
        }
    }
}
